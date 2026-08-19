import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthUser } from '../../domain/models/auth-user.model';
import { LoginCredentials } from '../../domain/models/login-credentials.model';

@Injectable({
  providedIn: 'root'
})
export class LoginUseCase {
  private authRepository = inject(AuthRepository);

  execute(credentials: LoginCredentials): Observable<AuthUser> {
    return this.authRepository.login(credentials);
  }
}
