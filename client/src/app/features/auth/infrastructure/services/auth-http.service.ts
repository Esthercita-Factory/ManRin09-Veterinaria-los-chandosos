import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthUser } from '../../domain/models/auth-user.model';
import { LoginCredentials } from '../../domain/models/login-credentials.model';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService implements AuthRepository {
  private http = inject(HttpClient);

  login(credentials: LoginCredentials): Observable<AuthUser> {
    // throw new Error('Not implemented');
    return EMPTY;
  }
}
