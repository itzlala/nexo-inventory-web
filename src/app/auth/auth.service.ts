import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface LoginResponse {
  Token: string;
  Usuario: string;
  Rol: string;
  ExpiraEn: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'nexo.inventory.session';
  private readonly sessionSubject = new BehaviorSubject<LoginResponse | null>(this.readSession());
  readonly session$ = this.sessionSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(usuario: string, contrasenia: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, {
      Usuario: usuario,
      Contrasenia: contrasenia
    }).pipe(
      tap(session => {
        sessionStorage.setItem(this.storageKey, JSON.stringify(session));
        this.sessionSubject.next(session);
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem(this.storageKey);
    this.sessionSubject.next(null);
    this.router.navigate(['/login']);
  }

  get token(): string | null { return this.sessionSubject.value?.Token ?? null; }
  get usuario(): string { return this.sessionSubject.value?.Usuario ?? 'Usuario'; }
  get rol(): string { return this.sessionSubject.value?.Rol ?? 'Colaborador'; }

  get isAuthenticated(): boolean {
    const session = this.sessionSubject.value;
    if (!session?.Token || !session.ExpiraEn) return false;
    return new Date(session.ExpiraEn).getTime() > Date.now();
  }

  private readSession(): LoginResponse | null {
    try {
      const value = sessionStorage.getItem(this.storageKey);
      return value ? JSON.parse(value) : null;
    } catch {
      sessionStorage.removeItem(this.storageKey);
      return null;
    }
  }
}
