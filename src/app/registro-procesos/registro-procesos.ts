import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProcesoService, ProcesoDto } from '../services/proceso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-procesos',
  imports: [FormsModule],
  templateUrl: './registro-procesos.html',
  styleUrl: './registro-procesos.css'
})
export class RegistroProcesos {
  procesos: ProcesoDto[] = [];
  nuevoProceso: ProcesoDto = {
    nombre: '',
    descripcion: '',
    categoria: '',
    estado: 'borrador'
  };
  
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  mostrarFormulario: boolean = false;

  constructor(
    private procesoService: ProcesoService,
    private router: Router
  ) {
    this.cargarProcesos();
  }

  cargarProcesos() {
    this.loading = true;
    
    this.procesoService.listar().subscribe({
      next: (procesos) => {
        this.procesos = procesos;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar procesos:', error);
        this.errorMessage = 'Error al cargar los procesos';
        this.loading = false;
      }
    });
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.limpiarFormulario();
    }
  }

  guardarProceso() {
    if (!this.nuevoProceso.nombre || !this.nuevoProceso.descripcion || !this.nuevoProceso.categoria) {
      this.errorMessage = 'Por favor complete todos los campos obligatorios';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;

    this.procesoService.crear(this.nuevoProceso).subscribe({
      next: (proceso) => {
        console.log('Proceso creado exitosamente:', proceso);
        this.successMessage = 'Proceso creado exitosamente';
        this.loading = false;
        this.cargarProcesos();
        this.toggleFormulario();
      },
      error: (error) => {
        console.error('Error al crear proceso:', error);
        this.errorMessage = 'Error al crear el proceso. Intente nuevamente.';
        this.loading = false;
      }
    });
  }

  limpiarFormulario() {
    this.nuevoProceso = {
      nombre: '',
      descripcion: '',
      categoria: '',
      estado: 'borrador'
    };
    this.errorMessage = '';
    this.successMessage = '';
  }

  editarProceso(proceso: ProcesoDto) {
    if (proceso.id) {
      this.router.navigate(['/editar-proceso'], { queryParams: { id: proceso.id } });
    }
  }

  eliminarProceso(proceso: ProcesoDto) {
    if (!proceso.id) return;
    
    if (confirm('¿Está seguro de que desea eliminar este proceso?')) {
      this.procesoService.eliminar(proceso.id).subscribe({
        next: () => {
          this.cargarProcesos();
          alert('Proceso eliminado exitosamente');
        },
        error: (error) => {
          console.error('Error al eliminar proceso:', error);
          alert('Error al eliminar el proceso');
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/crear-proceso']);
  }
}
