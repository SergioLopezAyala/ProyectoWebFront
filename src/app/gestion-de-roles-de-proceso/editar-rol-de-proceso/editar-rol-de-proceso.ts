import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessRoleService, ProcessRoleDto } from '../../services/process-role.service';

@Component({
  selector: 'app-editar-rol-de-proceso',
  imports: [FormsModule],
  templateUrl: './editar-rol-de-proceso.html',
  styleUrl: './editar-rol-de-proceso.css'
})
export class EditarRolDeProceso {
  roleId: number | null = null;
  nombreRol: string = '';
  descripcion: string = '';
  organizacionId: number | null = null;
  
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private processRoleService: ProcessRoleService
  ) {
    this.cargarRole();
  }

  cargarRole() {
    this.loading = true;
    
    // Obtener ID del role desde los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.roleId = +id;
        this.obtenerRole(this.roleId);
      } else {
        this.errorMessage = 'ID de rol no proporcionado';
        this.loading = false;
      }
    });
  }

  obtenerRole(id: number) {
    this.processRoleService.listar().subscribe({
      next: (roles) => {
        const role = roles.find(r => r.id === id);
        if (role) {
          this.nombreRol = role.nombre;
          this.descripcion = role.descripcion || '';
          this.organizacionId = role.organizacionId || null;
        } else {
          this.errorMessage = 'Rol no encontrado';
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar rol:', error);
        this.errorMessage = 'Error al cargar el rol';
        this.loading = false;
      }
    });
  }

  guardarCambios() {
    if (!this.roleId) {
      this.errorMessage = 'ID de rol no válido';
      return;
    }

    if (!this.nombreRol || !this.descripcion) {
      this.errorMessage = 'Por favor complete todos los campos obligatorios';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;

    const role: ProcessRoleDto = {
      nombre: this.nombreRol,
      descripcion: this.descripcion,
      organizacionId: this.organizacionId || undefined
    };

    this.processRoleService.actualizar(this.roleId, role).subscribe({
      next: (response) => {
        console.log('Rol actualizado exitosamente:', response);
        this.successMessage = 'Rol actualizado exitosamente';
        this.loading = false;
        
        // Redirigir después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/crear-proceso']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error al actualizar rol:', error);
        this.errorMessage = 'Error al actualizar el rol. Intente nuevamente.';
        this.loading = false;
      }
    });
  }

  cancelar() {
    this.router.navigate(['/crear-proceso']);
  }
}
