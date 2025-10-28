import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcesoService } from '../../services/proceso.service';

@Component({
  selector: 'app-eliminar-proceso',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './eliminar-proceso.html',
  styleUrl: './eliminar-proceso.css'
})
export class EliminarProceso {
  procesoId: number | null = null;
  nombreProceso: string = '';
  estadoProceso: string = '';
  confirmado: boolean = false;
  mensajeConfirmacion: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private procesoService: ProcesoService
  ) {
    this.cargarProceso();
  }

  cargarProceso() {
    this.loading = true;
    
    // Obtener ID del proceso desde los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.procesoId = +id;
        this.obtenerProceso(this.procesoId);
      } else {
        this.errorMessage = 'ID de proceso no proporcionado';
        this.loading = false;
      }
    });
  }

  obtenerProceso(id: number) {
    this.procesoService.obtener(id).subscribe({
      next: (proceso) => {
        this.nombreProceso = proceso.nombre;
        this.estadoProceso = proceso.estado;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar proceso:', error);
        this.errorMessage = 'Error al cargar el proceso';
        this.loading = false;
      }
    });
  }

  confirmarEliminacion() {
    if (!this.procesoId) {
      this.errorMessage = 'ID de proceso no válido';
      return;
    }

    const confirmar = confirm(
      `¿Confirmas eliminar el proceso "${this.nombreProceso}"?\n\nEsta acción no se puede deshacer.`
    );

    if (confirmar) {
      this.loading = true;
      
      this.procesoService.eliminar(this.procesoId, false).subscribe({
        next: () => {
          this.confirmado = true;
          this.estadoProceso = 'inactivo';
          this.mensajeConfirmacion = `El proceso "${this.nombreProceso}" ha sido eliminado correctamente.`;
          this.loading = false;
          
          // Redirigir a la lista de procesos después de 3 segundos
          setTimeout(() => {
            this.router.navigate(['/consultar-proceso']);
          }, 3000);
        },
        error: (error) => {
          console.error('Error al eliminar proceso:', error);
          this.errorMessage = 'Error al eliminar el proceso. Intente nuevamente.';
          this.loading = false;
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/consultar-proceso']);
    this.mensajeConfirmacion = 'Operación cancelada.';
    console.log('Eliminación cancelada');
  }
}
