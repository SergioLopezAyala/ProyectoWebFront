import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcesoService, ProcesoDto } from '../../services/proceso.service';

@Component({
  selector: "app-editar-proceso",
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: "./editar-proceso.html",
  styleUrl: "./editar-proceso.css"
})
export class EditarProceso {
  procesoId: number | null = null;
  nombreProceso: string = '';
  descripcionProceso: string = '';
  categoriaProceso: string = '';
  estadoProceso: string = 'borrador';
  permisoEdicionProceso: boolean = true;
  mensajeHistorialProceso: string = '';
  
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

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
        this.descripcionProceso = proceso.descripcion;
        this.categoriaProceso = proceso.categoria;
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

  guardarCambios() {
    if (!this.permisoEdicionProceso) {
      alert("No tienes permisos para realizar esta acción.");
      return;
    }

    if (!this.procesoId) {
      this.errorMessage = 'ID de proceso no válido';
      return;
    }

    if (!this.nombreProceso || !this.descripcionProceso || !this.categoriaProceso) {
      this.errorMessage = 'Por favor complete todos los campos obligatorios';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;

    const procesoActualizado: ProcesoDto = {
      nombre: this.nombreProceso,
      descripcion: this.descripcionProceso,
      categoria: this.categoriaProceso,
      estado: this.estadoProceso
    };

    this.procesoService.actualizar(this.procesoId, procesoActualizado).subscribe({
      next: (proceso) => {
        console.log("Proceso actualizado exitosamente: ", proceso);
        this.successMessage = 'Proceso actualizado exitosamente';
        this.loading = false;
        
        // Redirigir a la lista de procesos después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/consultar-proceso']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error al actualizar proceso:', error);
        this.errorMessage = 'Error al actualizar el proceso. Intente nuevamente.';
        this.loading = false;
      }
    });
  }

  cancelar() {
    this.router.navigate(['/consultar-proceso']);
    console.log("Edición cancelada");
    this.mensajeHistorialProceso = "Edición cancelada";
  }
}
