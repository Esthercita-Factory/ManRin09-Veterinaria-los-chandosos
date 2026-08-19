import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="w-full max-w-sm mx-auto">
      <div class="flex flex-col items-center mb-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-800 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 2a2 2 0 012 2 2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2zm4 2a2 2 0 012 2 2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2zM8 4a2 2 0 012 2 2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2zm-2.5 4A1.5 1.5 0 017 9.5 1.5 1.5 0 015.5 11 1.5 1.5 0 014 9.5 1.5 1.5 0 015.5 8zm13 0a1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5 1.5 1.5 0 01-1.5-1.5A1.5 1.5 0 0118.5 8zM12 11c-2.8 0-5 2.2-5 5v1c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-1c0-2.8-2.2-5-5-5z"/></svg>
        <h1 class="text-xl font-semibold text-gray-800">Huellitas Felices<br><span class="text-sm font-normal text-gray-500">Veterinary Clinic</span></h1>
      </div>
      
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-8">Welcome Back, Pet Owner</h2>
      
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-5">
        <div>
          <input type="email" id="email" formControlName="email" placeholder="Email Address" 
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#89A88C] focus:border-transparent transition-colors"
            [class.border-red-500]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" />

          @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
            <p class="text-xs text-red-500 mt-1 px-1 font-medium">
              @if (loginForm.get('email')?.errors?.['required']) {
                El correo electrónico es requerido.
              } @else {
                Ingresa un correo electrónico válido con '&#64;'.
              }
            </p>
          }
        </div>
        
        <div>
          <input type="password" id="password" formControlName="password" placeholder="Password" 
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#89A88C] focus:border-transparent transition-colors"
            [class.border-red-500]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" />
          <div class="text-right mt-2">
            <a href="#" class="text-sm text-gray-600 hover:text-gray-900 underline decoration-gray-400">Forgot Password?</a>
          </div>
        </div>
        
        <button type="submit" [disabled]="loginForm.invalid" 
          class="w-full bg-[#89A88C] text-white py-3 rounded-full font-medium hover:bg-[#77947A] transition-colors disabled:opacity-50 mt-4">
          Login
        </button>
      </form>
      
      <div class="mt-6 text-center">
        <div class="bg-gray-50 rounded-lg py-3">
          <span class="text-gray-600 text-sm">New to Huellitas Felices? </span>
          <a routerLink="/auth/registro" class="text-[#89A88C] font-medium text-sm hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LoginFormComponent {
  loginForm: FormGroup;
  @Output() loginSubmit = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginSubmit.emit(this.loginForm.value);
    }
  }
}
