import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessRoleService, ProcessRoleDto } from '../../services/process-role.service';

@Component({
  selector: 'app-eliminar-rol-de-proceso',
  imports: [FormsModule],
  templateUrl: './eliminar-rol-de-proceso.html',
  styleUrl: './eliminar-rol-de-proceso.css'
})
export class EliminarRolDeProceso {
  roleId: number | null = null;
  nombreRol: string = '';
  descripcion: string = '';
  
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

  confirmarEliminacion() {
    if (!this.roleId) {
      this.errorMessage = 'ID de rol no válido';
      return;
    }

    const confirmar = confirm(
      `¿Confirma eliminar el rol "${this.nombreRol}"?\n\nEsta acción no se puede deshacer.`
    );

    if (confirmar) {
      this.loading = true;
      
      this.processRoleService.eliminar(this.roleId).subscribe({
        next: () => {
          console.log('Rol eliminado exitosamente');
          this.successMessage = `El rol "${this.nombreRol}" ha sido eliminado correctamente.`;
          this.loading = false;
          
          // Redirigir a la página principal después de 3 segundos
          setTimeout(() => {
            this.router.navigate(['/crear-proceso']);
          }, 3000);
        },
        error: (error) => {
          console.error('Error al eliminar rol:', error);
          this.errorMessage = 'Error al eliminar el rol. Intente nuevamente.';
          this.loading = false;
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/crear-proceso']);
  }
}
