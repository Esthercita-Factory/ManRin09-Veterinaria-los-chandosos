import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './router/app.routes';
import { AuthRepository } from './features/auth/domain/repositories/auth.repository';
import { AuthHttpService } from './features/auth/infrastructure/services/auth-http.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    { provide: AuthRepository, useClass: AuthHttpService }
  ]
};
