import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },


    { path: 'login', loadComponent: () => import('./autenticacion-y-cuentas/login/login').then(m => m.Login) },
    { path: 'registro-de-empresa', loadComponent: () => import('./autenticacion-y-cuentas/registro-de-empresa/registro-de-empresa').then(m => m.RegistroDeEmpresa) },


    { path: 'crear-proceso', loadComponent: () => import('./gestion-de-procesos/crear-proceso/crear-proceso').then(m => m.CrearProceso) },
    { path: 'editar-proceso', loadComponent: () => import('./gestion-de-procesos/editar-proceso/editar-proceso').then(m => m.EditarProceso) },
    { path: 'eliminar-proceso', loadComponent: () => import('./gestion-de-procesos/eliminar-proceso/eliminar-proceso').then(m => m.EliminarProceso) },
    { path: 'consultar-proceso', loadComponent: () => import('./gestion-de-procesos/consultar-proceso/consultar-proceso').then(m => m.ConsultarProceso) },
    { path: 'eliminar-proceso', loadComponent: () => import('./gestion-de-procesos/eliminar-proceso/eliminar-proceso').then(m => m.EliminarProceso) },

    { path: 'crear-rol-de-proceso', loadComponent: () => import('./gestion-de-roles-de-proceso/crear-rol-de-proceso/crear-rol-de-proceso').then(m => m.CrearRolDeProceso) },
    { path: '**', redirectTo: '' },

];
