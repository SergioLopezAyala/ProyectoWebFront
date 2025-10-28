import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProcesoService, ProcesoDto } from '../../services/proceso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-proceso',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-proceso.html',
  styleUrl: './crear-proceso.css'
})
export class CrearProceso {
  nombreProceso: string = '';
  descripcionProceso: string = '';
  categoriaProceso: string = '';
  estadoProceso: string = 'borrador';
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private procesoService: ProcesoService,
    private router: Router
  ) {}

  crearProceso() {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;

    if (!this.nombreProceso || !this.descripcionProceso || !this.categoriaProceso) {
      this.errorMessage = 'Por favor complete todos los campos obligatorios';
      this.loading = false;
      return;
    }

    const proceso: ProcesoDto = {
      nombre: this.nombreProceso,
      descripcion: this.descripcionProceso,
      categoria: this.categoriaProceso,
      estado: this.estadoProceso
    };

    this.procesoService.crear(proceso).subscribe({
      next: (response) => {
        console.log("Proceso creado exitosamente:", response);
        this.successMessage = 'Proceso creado exitosamente';
        this.loading = false;
        
        // Limpiar formulario después de 2 segundos y redirigir
        setTimeout(() => {
          this.limpiarFormulario();
          this.router.navigate(['/consultar-proceso']);
        }, 2000);
      },
      error: (error) => {
        console.error("Error al crear proceso:", error);
        this.errorMessage = 'Error al crear el proceso. Intente nuevamente.';
        this.loading = false;
      }
    });
  }

  limpiarFormulario() {
    this.nombreProceso = '';
    this.descripcionProceso = '';
    this.categoriaProceso = '';
    this.estadoProceso = 'borrador';
  }

  cancelar() {
    this.limpiarFormulario();
    this.router.navigate(['/consultar-proceso']);
    console.log('Creación de proceso cancelada');
  }
}
