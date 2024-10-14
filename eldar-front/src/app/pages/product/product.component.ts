import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';

import { ProductService } from '../../services/product.service';
import { AuthService } from '../../auth/auth.service';

import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { MessageService, SelectItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule,CommonModule, TableModule, TagModule, RatingModule, ButtonModule,ToastModule,DropdownModule,InputTextModule,ToolbarModule,ConfirmDialogModule,InputTextareaModule,FileUploadModule,RadioButtonModule,InputNumberModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  providers: [ProductService, MessageService]
})
export class ProductComponent implements OnInit {
  products!: Product[];
  statuses!: SelectItem[];
  clonedProducts: { [s: string]: Product } = {};
  newProduct: Product = { id: 0, name: '', price: 0, description: '', stock: 0, userId: 0, completed: false }; 

  constructor(
    private productService: ProductService, 
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.statuses = [
      { label: 'In Stock', value: 'INSTOCK' },
      { label: 'Low Stock', value: 'LOWSTOCK' },
      { label: 'Out of Stock', value: 'OUTOFSTOCK' }
    ];
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onRowEditInit(product: Product) {
    this.clonedProducts[product.id] = { ...product };
  }

  onRowEditSave(product: Product) {
    if (product.price > 0) {
      this.productService.updateProduct(product).subscribe(() => {
        delete this.clonedProducts[product.id];
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
        this.loadProducts();
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
  }

  onRowEditCancel(product: Product, index: number) {
    this.products[index] = this.clonedProducts[product.id];
    delete this.clonedProducts[product.id];
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
        this.products = this.products.filter(p => p.id !== product.id); 
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is deleted' });
    }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el producto' });
    });
}


addProduct() {
  const currentUserId = this.authService.getCurrentUserId(); // Obtiene el ID del usuario actual

  // Validación de campos
  if (!this.newProduct.name || !this.newProduct.price || !this.newProduct.description || this.newProduct.stock <= 0 || currentUserId === null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Todos los campos son obligatorios y el stock debe ser mayor que cero.' });
      return; 
  }

  this.newProduct.userId = currentUserId;

  this.productService.createProduct(this.newProduct).subscribe((product) => {
      this.products.push(product);
      this.newProduct = { id: 0, name: '', price: 0, description: '', stock: 0, userId: 0, completed: false }; 
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is created' });
  });
}


  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }
}