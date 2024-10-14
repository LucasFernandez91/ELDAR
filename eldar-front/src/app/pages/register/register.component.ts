import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../auth/auth.service';
import { MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { passmisMatchValidator } from '../../shared/directive/pass-masmatch.directive';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    ReactiveFormsModule,
    ButtonModule, 
    CardModule,
    InputTextModule,
    PasswordModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

registerForm: FormGroup;



constructor(
  private registerService: AuthService,
  private messageService: MessageService,
  private router: Router,
  private fb: FormBuilder,
) {
  this.registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  }, { validators: passmisMatchValidator });
}

onRegister() {
  if (this.registerForm.valid) {
    const userData = this.registerForm.value;
    this.registerService.registerUser(userData).subscribe({
      next: (response) => {
        this.messageService.add({severity:'success', summary: 'Registro exitoso', detail: 'Usuario registrado correctamente' });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al registrar el usuario' });
    }
    });
  }
}


 get fullName() {
  return this.registerForm.get('fullName');
}

get email() {
  return this.registerForm.get('email');
}

get password() {
  return this.registerForm.get('password');
}

get confirmPassword() {
  return this.registerForm.get('confirmPassword');
}


isInvalid(controlName: string): boolean {
  const control = this.registerForm.get(controlName);
  return control ? control.invalid && control.touched : false; 
}


} 
