import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  loading = false;
  errorMessage = '';
  readonly loginForm = this.formBuilder.group({
    usuario: ['', [Validators.required, Validators.maxLength(80)]],
    contrasenia: ['', [Validators.required, Validators.minLength(4)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated) this.router.navigate(['/dashboard']);
  }

  login(): void {
    if (this.loginForm.invalid || this.loading) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    const { usuario, contrasenia } = this.loginForm.getRawValue();
    this.auth.login(usuario || '', contrasenia || '').subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: error => {
        this.loading = false;
        this.errorMessage = error.status === 0
          ? 'No fue posible conectar con el servidor. Verifica que la API esté activa.'
          : 'El usuario o la contraseña no son correctos.';
      }
    });
  }
}
