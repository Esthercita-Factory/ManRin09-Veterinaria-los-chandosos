import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthUser } from '../../domain/models/auth-user.model';
import { LoginCredentials } from '../../domain/models/login-credentials.model';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService implements AuthRepository {
  private http = inject(HttpClient);
  private apiUrl = '/api/auth';

  login(credentials: LoginCredentials): Observable<AuthUser> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      map(response => ({
        id: String(response.usuarioId),
        usuarioId: response.usuarioId,
        nombre: response.nombre,
        email: response.email,
        token: response.token,
        rol: response.rol
      })),
      tap(user => {
        if (user && user.token) {
          localStorage.setItem('auth_token', user.token);
          localStorage.setItem('user_role', user.rol);
          localStorage.setItem('user_nombre', user.nombre ?? '');
          localStorage.setItem('user_email', user.email ?? '');
          localStorage.setItem('user_id', String(user.usuarioId ?? ''));
        }
      })
    );
  }
}
