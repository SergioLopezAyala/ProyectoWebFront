import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./login/login').then(m => m.Login) },
    { path: 'registro-de-empresa', loadComponent: () => import('./registro-de-empresa/registro-de-empresa').then(m => m.RegistroDeEmpresa) },
    { path: '**', redirectTo: '' },

];
