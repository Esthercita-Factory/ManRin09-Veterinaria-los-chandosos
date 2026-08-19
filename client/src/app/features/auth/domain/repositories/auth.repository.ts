import { Observable } from 'rxjs';
import { AuthUser } from '../models/auth-user.model';
import { LoginCredentials } from '../models/login-credentials.model';

export abstract class AuthRepository {
  abstract login(credentials: LoginCredentials): Observable<AuthUser>;
}
