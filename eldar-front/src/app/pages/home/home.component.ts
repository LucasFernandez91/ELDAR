import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, CommonModule, NavbarComponent, RouterModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

    constructor(
      private router: Router,
      public authService: AuthService

    ) { }

    get isAdmin(): boolean {
      return this.authService.getRole() === 'admin';
    }
  
    get isUser(): boolean {
      return this.authService.getRole() === 'user';
    }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
