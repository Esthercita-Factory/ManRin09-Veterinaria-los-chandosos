import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';

// Validador personalizado para los requisitos de la contraseña
export function passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  if (!value) return null;

  const errors: Record<string, boolean> = {};

  if (value.length < 8 || value.length > 20) {
    errors['length'] = true;
  }
  if (!/[A-Z]/.test(value)) {
    errors['noUppercase'] = true;
  }
  if (!/[a-z]/.test(value)) {
    errors['noLowercase'] = true;
  }
  if (!/\d/.test(value)) {
    errors['noNumber'] = true;
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(value)) {
    errors['noSpecialChar'] = true;
  }
  if (/[ñÑ]/.test(value)) {
    errors['hasNEnie'] = true;
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

// Validador para confirmar coincidencia de contraseñas
export function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password && confirmPassword && password !== confirmPassword
    ? { passwordMismatch: true }
    : null;
}

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="flex min-h-screen bg-white font-sans text-gray-800">
      <!-- Form Side (Left) -->
      <div class="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 overflow-y-auto">
        <div class="w-full max-w-md mx-auto py-6">
          <!-- Title -->
          <div class="text-center mb-6">
            <h1 class="text-3xl sm:text-4xl font-bold text-[#89A88C] leading-tight">
              Veterinary Staff<br>Registration
            </h1>
          </div>

          <!-- Registration Form -->
          @if (errorMessage) {
            <div class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm text-center">
              {{ errorMessage }}
            </div>
          }
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <!-- First Name -->
            <div>
              <input type="text" formControlName="firstName" placeholder="First Name"
                class="w-full px-5 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#89A88C] focus:border-transparent transition-colors text-sm text-gray-700 placeholder-gray-400"
                [class.border-red-500]="registerForm.get('firstName')?.invalid && registerForm.get('firstName')?.touched" />
            </div>

            <!-- Last Name -->
            <div>
              <input type="text" formControlName="lastName" placeholder="Last Name"
                class="w-full px-5 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#89A88C] focus:border-transparent transition-colors text-sm text-gray-700 placeholder-gray-400"
                [class.border-red-500]="registerForm.get('lastName')?.invalid && registerForm.get('lastName')?.touched" />
            </div>

            <!-- Documento Field -->
            <div>
              <input type="text" formControlName="documentoIdentificacion" placeholder="Documento de Identidad (ej. CC, Pasaporte)"
                class="w-full px-5 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#89A88C] focus:border-transparent transition-colors text-sm text-gray-700 placeholder-gray-400"
                [class.border-red-500]="registerForm.get('documentoIdentificacion')?.invalid && registerForm.get('documentoIdentificacion')?.touched" />
            </div>

            <!-- Email -->
            <div>
              <input type="email" formControlName="email" placeholder="Email"
                class="w-full px-5 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#89A88C] focus:border-transparent transition-colors text-sm text-gray-700 placeholder-gray-400"
                [class.border-red-500]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched" />

              @if (registerForm.get('email')?.invalid && registerForm.get('email')?.touched) {
                <p class="text-xs text-red-500 mt-1.5 px-1 font-medium">
                  @if (registerForm.get('email')?.errors?.['required']) {
                    El correo electrónico es requerido.
                  } @else {
                    Ingresa un correo electrónico válido (debe incluir '&#64;' y un dominio válido).
                  }
                </p>
              }
            </div>

            <!-- Phone Number -->
            <div>
              <input type="tel" formControlName="phone" placeholder="Phone Number"
                class="w-full px-5 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#89A88C] focus:border-transparent transition-colors text-sm text-gray-700 placeholder-gray-400"
                [class.border-red-500]="registerForm.get('phone')?.invalid && registerForm.get('phone')?.touched" />
            </div>

            <!-- Rol Selection Dropdown -->
            <div>
              <div class="relative">
                <select formControlName="rol"
                  class="w-full px-5 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#89A88C] focus:border-transparent transition-colors text-sm text-gray-700 bg-white appearance-none cursor-pointer"
                  [class.border-red-500]="registerForm.get('rol')?.invalid && registerForm.get('rol')?.touched">
                  <option value="" disabled selected>Selecciona tu rol</option>
                  <option value="Veterinario">Veterinario (Personal Médico)</option>
                  <option value="Dueno">Dueño de Mascota</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Password Field -->
            <div>
              <input type="password" formControlName="password" placeholder="Password"
                class="w-full px-5 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#89A88C] focus:border-transparent transition-colors text-sm text-gray-700 placeholder-gray-400"
                [class.border-red-500]="passwordControl?.invalid && passwordControl?.touched" />

              <!-- Password Requirements List / Feedback -->
              @if (passwordControl?.dirty || passwordControl?.touched) {
                <div class="mt-2.5 p-3.5 bg-gray-50 rounded-xl text-xs space-y-1.5 border border-gray-100">
                  <p class="font-semibold text-gray-600 mb-1">Requisitos de la contraseña:</p>
                  
                  <div class="flex items-center gap-1.5" [ngClass]="isLengthValid ? 'text-emerald-700 font-medium' : 'text-gray-500'">
                    <span>{{ isLengthValid ? '✓' : '•' }}</span>
                    <span>Entre 8 y 20 caracteres</span>
                  </div>

                  <div class="flex items-center gap-1.5" [ngClass]="hasUppercase ? 'text-emerald-700 font-medium' : 'text-gray-500'">
                    <span>{{ hasUppercase ? '✓' : '•' }}</span>
                    <span>Al menos una letra mayúscula</span>
                  </div>

                  <div class="flex items-center gap-1.5" [ngClass]="hasLowercase ? 'text-emerald-700 font-medium' : 'text-gray-500'">
                    <span>{{ hasLowercase ? '✓' : '•' }}</span>
                    <span>Al menos una letra minúscula</span>
                  </div>

                  <div class="flex items-center gap-1.5" [ngClass]="hasNumber ? 'text-emerald-700 font-medium' : 'text-gray-500'">
                    <span>{{ hasNumber ? '✓' : '•' }}</span>
                    <span>Al menos un número (0-9)</span>
                  </div>

                  <div class="flex items-center gap-1.5" [ngClass]="hasSpecialChar ? 'text-emerald-700 font-medium' : 'text-gray-500'">
                    <span>{{ hasSpecialChar ? '✓' : '•' }}</span>
                    <span>Al menos un carácter especial (!&#64;#$%^&*...)</span>
                  </div>

                  <div class="flex items-center gap-1.5" [ngClass]="noNEnie ? 'text-emerald-700 font-medium' : 'text-rose-600 font-medium'">
                    <span>{{ noNEnie ? '✓' : '✗' }}</span>
                    <span>No debe contener la letra 'ñ' ni 'Ñ'</span>
                  </div>
                </div>
              }
            </div>

            <!-- Confirm Password Field -->
            <div>
              <input type="password" formControlName="confirmPassword" placeholder="Confirm Password"
                class="w-full px-5 py-3.5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#89A88C] focus:border-transparent transition-colors text-sm text-gray-700 placeholder-gray-400"
                [class.border-red-500]="(registerForm.errors?.['passwordMismatch'] || registerForm.get('confirmPassword')?.invalid) && registerForm.get('confirmPassword')?.touched" />

              @if (registerForm.errors?.['passwordMismatch'] && registerForm.get('confirmPassword')?.touched) {
                <p class="text-xs text-red-500 mt-1.5 px-1 font-medium">Las contraseñas no coinciden.</p>
              }
            </div>

            <!-- Submit Button -->
            <button type="submit" [disabled]="registerForm.invalid"
              class="w-full bg-[#89A88C] hover:bg-[#77947A] text-white py-3.5 rounded-full font-semibold text-base transition-colors disabled:opacity-50 shadow-sm mt-4">
              Create Account
            </button>
          </form>

          <!-- Footer Link -->
          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Already have an account? 
              <a routerLink="/auth/login" class="text-gray-900 font-semibold hover:underline">Login</a>
            </p>
          </div>
        </div>
      </div>

      <!-- Image Side (Right) -->
      <div class="hidden md:block w-1/2 relative bg-gray-50">
        <img src="https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
             alt="Grey cat on examination table" 
             class="absolute inset-0 w-full h-full object-cover object-center" />
      </div>
    </div>
  `,
  styles: []
})
export class RegisterPageComponent {
  registerForm: FormGroup;
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage: string | null = null;
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      documentoIdentificacion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      phone: ['', Validators.required],
      rol: ['', Validators.required],
      password: ['', [Validators.required, passwordStrengthValidator]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  get passwordControl() {
    return this.registerForm.get('password');
  }

  get passwordValue(): string {
    return this.passwordControl?.value || '';
  }

  get isLengthValid(): boolean {
    return this.passwordValue.length >= 8 && this.passwordValue.length <= 20;
  }

  get hasUppercase(): boolean {
    return /[A-Z]/.test(this.passwordValue);
  }

  get hasLowercase(): boolean {
    return /[a-z]/.test(this.passwordValue);
  }

  get hasNumber(): boolean {
    return /\d/.test(this.passwordValue);
  }

  get hasSpecialChar(): boolean {
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(this.passwordValue);
  }

  get noNEnie(): boolean {
    return !/[ñÑ]/.test(this.passwordValue);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;

      const formValue = this.registerForm.value;
      const rol = formValue.rol;

      const onSuccess = (res: any) => {
        this.isLoading = false;
        if (res.rol === 'Veterinario') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/portal-dueno']);
        }
      };

      const onError = (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Error al crear la cuenta.';
      };

      if (rol === 'Veterinario') {
        const payload = {
          nombre: `${formValue.firstName} ${formValue.lastName}`,
          email: formValue.email,
          especialidad: 'General', // Default, should be added to form eventually
          tarjetaProfesional: 'Pendiente', // Default
          password: formValue.password
        };
        this.authService.registerVeterinario(payload).subscribe({ next: onSuccess, error: onError });
      } else {
        const payload = {
          nombre: `${formValue.firstName} ${formValue.lastName}`,
          documentoIdentificacion: formValue.documentoIdentificacion,
          email: formValue.email,
          telefono: formValue.phone,
          password: formValue.password
        };
        this.authService.registerDueno(payload).subscribe({ next: onSuccess, error: onError });
      }
    }
  }
}
