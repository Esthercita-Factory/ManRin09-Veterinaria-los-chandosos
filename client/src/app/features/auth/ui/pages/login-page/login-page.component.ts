import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  template: `
    <div class="flex min-h-screen bg-white">
      <div class="hidden md:block w-1/2 relative">
        <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
             alt="Sleeping kitten" 
             class="absolute inset-0 w-full h-full object-cover rounded-r-3xl" />
      </div>
      
      <div class="w-full md:w-1/2 flex flex-col items-center justify-center p-8 relative">
        @if (errorMessage) {
          <div class="absolute top-8 left-1/2 -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-3/4 max-w-sm text-sm text-center">
            {{ errorMessage }}
          </div>
        }
        <app-login-form (loginSubmit)="onLoginSubmit($event)"></app-login-form>
      </div>
    </div>
  `,
  styles: []
})
export class LoginPageComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  errorMessage: string | null = null;

  onLoginSubmit(credentials: any) {
    this.errorMessage = null;
    
    this.authService.login(credentials).subscribe({
      next: (res: any) => {
        if (res.rol === 'Veterinario') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/portal-dueno']);
        }
      },
      error: (err: any) => {
        if (err.status === 401) {
          this.errorMessage = 'Credenciales inválidas.';
        } else if (err.status === 409) {
          this.errorMessage = 'El usuario ya existe. Por favor, inicie sesión.';
        } else {
          this.errorMessage = err.error?.message || 'Error de conexión.';
        }
      }
    });
  }
}
