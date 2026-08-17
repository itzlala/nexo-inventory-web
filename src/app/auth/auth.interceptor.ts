import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authenticatedRequest = this.auth.token
      ? request.clone({ setHeaders: { Authorization: `Bearer ${this.auth.token}` } })
      : request;

    return next.handle(authenticatedRequest).pipe(
      catchError(error => {
        if (error.status === 401 && !request.url.endsWith('/auth/login')) this.auth.logout();
        return throwError(() => error);
      })
    );
  }
}
