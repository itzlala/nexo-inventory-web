import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// componentes
import { ShowInventarioComponent } from './inventario/show-inventario/show-inventario.component';
import { ShowUsuariosComponent } from './inventario/show-usuarios/show-usuarios.component';
import { LoginComponent } from './inventario/login/login.component';
import { PageNotFoundComponentComponent } from './inventario/page-not-found-component/page-not-found-component.component';
import { PanelOpcionesComponent } from './inventario/panel-opciones/panel-opciones.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: PanelOpcionesComponent },
      { path: 'home', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'inventario', component: ShowInventarioComponent },
      { path: 'usuarios', component: ShowUsuariosComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponentComponent }
];
export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true });
