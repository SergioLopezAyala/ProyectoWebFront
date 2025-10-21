import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./autenticacion-y-cuentas/login/login').then(m => m.Login) },
    { path: 'registro-de-empresa', loadComponent: () => import('./autenticacion-y-cuentas/registro-de-empresa/registro-de-empresa').then(m => m.RegistroDeEmpresa) },
    { path: 'crear-proceso', loadComponent: () => import('./gestion-de-procesos/crear-proceso/crear-proceso').then(m => m.CrearProceso) },
    { path: '**', redirectTo: '' },

];
