import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthResponse {
  token: string;
  email: string;
  nombre: string;
  rol: 'Veterinario' | 'Dueno';
  usuarioId: number;
  expiracion: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor() {}

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('user_role', response.rol);
          localStorage.setItem('user_nombre', response.nombre ?? '');
          localStorage.setItem('user_email', response.email ?? '');
          localStorage.setItem('user_id', String(response.usuarioId ?? ''));
        }
      })
    );
  }

  registerDueno(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/registro/dueno`, data).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('user_role', response.rol);
          localStorage.setItem('user_nombre', response.nombre ?? '');
          localStorage.setItem('user_email', response.email ?? '');
          localStorage.setItem('user_id', String(response.usuarioId ?? ''));
        }
      })
    );
  }

  registerVeterinario(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/registro/veterinario`, data).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('user_role', response.rol);
          localStorage.setItem('user_nombre', response.nombre ?? '');
          localStorage.setItem('user_email', response.email ?? '');
          localStorage.setItem('user_id', String(response.usuarioId ?? ''));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_nombre');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_id');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getRole(): string | null {
    return localStorage.getItem('user_role');
  }
}
