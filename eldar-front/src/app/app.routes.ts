import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './auth/auth.guard';

// export const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { 
//     path: 'home', 
//     component: HomeComponent, 
//     canActivate: [authGuard],  
//     data: { roles: ['admin', 'user'] } 
//   },
//   { 
//     path: 'dashboard', 
//     component: DashboardComponent, 
//     canActivate: [authGuard], 
//     data: { roles: ['admin', 'user'] } 
//   },
//   { 
//     path: 'admin', 
//     component: AdminDashboardComponent, 
//     canActivate: [authGuard], 
//     data: { roles: ['admin'] } 
//   },
//   { path: '', redirectTo: '/login', pathMatch: 'full' }
// ];

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'home', 
    component: HomeComponent, 
    canActivate: [authGuard],data: { roles: ['admin', 'user'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirige al dashboard por defecto
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] ,data: { roles: ['admin', 'user'] } },     
      { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard], data: { roles: ['admin'] }}
    ] 
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
