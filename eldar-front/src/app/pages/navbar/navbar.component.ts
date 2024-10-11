import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple'
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule,BadgeModule,AvatarModule,InputTextModule,CommonModule,RippleModule,ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit   {
  items: MenuItem[] | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
  
  ) { }

  ngOnInit() {
    this.items = [
        {
            label: 'Inicio',
            icon: 'pi pi-home',
            routerLink: '/home',
            command: () => this.router.navigate(['/home'])
            
          },
          {
            label: 'dashboard',
            icon: 'pi pi-star',
            routerLink: '/home/dashboard',
            command: () => this.router.navigate(['/home/dashboard'])
        },
         // Agrega el ítem de editar solo si el usuario es admin
      ...(this.authService.getRole() === 'admin' ? [{
        label: 'Editar',
        icon: 'pi pi-pencil',
        routerLink: '/home/admin',
        ommand: () => this.router.navigate(['/home/admin'])  // Ajusta la ruta de edición según tu configuración
      }] : [])
    ];
}

logout(){
  sessionStorage.clear();
  this.router.navigate(['/login']);
}

}
