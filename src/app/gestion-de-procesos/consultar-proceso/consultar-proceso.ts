import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { ProcesoService, ProcesoDto } from '../../services/proceso.service';
import { Router } from '@angular/router';

interface ProcesoView {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  estado: string;
  fecha?: string;
  duracion?: number;
  actividadesProceso?: string[];
  arcosProceso?: string[];
  gatewaysProceso?: string[];
}

@Component({
  selector: 'app-consultar-proceso',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './consultar-proceso.html',
  styleUrls: ['./consultar-proceso.css']
})
export class ConsultarProceso {
  terminoBusqueda: string = '';
  mostrarFiltro: boolean = false;
  filtroFecha: string = '';
  filtroDuracion: number | null = null;
  filtroEstado: string = '';
  
  // Estados para la carga de datos
  loading: boolean = false;
  errorMessage: string = '';
  
  // Modal
  modalOpen: boolean = false;
  procesoSeleccionado: ProcesoView | null = null;
  
  // Lista de procesos desde el backend
  procesos: ProcesoView[] = [];
  todosLosProcesos: ProcesoView[] = [];

  constructor(
    private procesoService: ProcesoService,
    private router: Router
  ) {
    this.cargarProcesos();
  }

  cargarProcesos() {
    this.loading = true;
    this.errorMessage = '';
    
    this.procesoService.listar().subscribe({
      next: (procesosBackend) => {
        console.log('Procesos cargados desde backend:', procesosBackend);
        // Mapear datos del backend al formato del frontend
        this.todosLosProcesos = procesosBackend.map((p, index) => ({
          id: p.id || index,
          nombre: p.nombre,
          descripcion: p.descripcion,
          categoria: p.categoria,
          estado: p.estado,
          fecha: '2025-10-01', // Valores por defecto para campos no disponibles
          duracion: 7,
          actividadesProceso: p.actividadesProceso || ['Actividad 1', 'Actividad 2'],
          arcosProceso: p.arcosProceso || ['Arco 1'],
          gatewaysProceso: p.gatewaysProceso || ['Gateway 1']
        }));
        
        this.procesos = [...this.todosLosProcesos];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar procesos:', error);
        this.errorMessage = 'Error al cargar los procesos';
        this.loading = false;
        
        // Usar datos de ejemplo como fallback
        this.todosLosProcesos = [
          {
            id: 1,
            nombre: 'Gestión de reservas',
            descripcion: 'Proceso para gestionar reservas de servicios',
            categoria: 'servicio',
            estado: 'activo',
            fecha: '2025-10-01',
            duracion: 7,
            actividadesProceso: ['Recepción de solicitud', 'Verificación de disponibilidad', 'Confirmación de reserva'],
            arcosProceso: ['Flujo estándar', 'Flujo de cancelación'],
            gatewaysProceso: ['Gateway de decisión', 'Gateway de fin']
          }
        ];
        this.procesos = [...this.todosLosProcesos];
      }
    });
  }

  toggleFiltro() {
    this.mostrarFiltro = !this.mostrarFiltro;
  }

  filtrarProcesos(): ProcesoView[] {
    const term = this.terminoBusqueda.trim().toLowerCase();
    return this.todosLosProcesos.filter(p => {
      const coincideBusqueda =
        term === '' ||
        p.nombre.toLowerCase().includes(term) ||
        p.categoria.toLowerCase().includes(term) ||
        p.descripcion.toLowerCase().includes(term);

      const coincideEstado = this.filtroEstado
        ? p.estado === this.filtroEstado
        : true;

      const coincideFecha = this.filtroFecha
        ? p.fecha === this.filtroFecha
        : true;

      const coincideDuracion = this.filtroDuracion != null
        ? p.duracion === this.filtroDuracion
        : true;

      return coincideBusqueda && coincideEstado && coincideFecha && coincideDuracion;
    });
  }

  abrirModal(p: ProcesoView) {
    this.procesoSeleccionado = p;
    this.modalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  cerrarModal() {
    this.modalOpen = false;
    this.procesoSeleccionado = null;
    document.body.style.overflow = '';
  }

  verDetalles(p: ProcesoView) {
    this.abrirModal(p);
  }

  editarProceso(p: ProcesoView) {
    this.router.navigate(['/editar-proceso'], { queryParams: { id: p.id } });
  }

  eliminarProceso(p: ProcesoView) {
    if (confirm('¿Está seguro de que desea eliminar este proceso?')) {
      this.procesoService.eliminar(p.id).subscribe({
        next: () => {
          console.log('Proceso eliminado exitosamente');
          this.cargarProcesos(); // Recargar la lista
          alert('Proceso eliminado exitosamente');
        },
        error: (error) => {
          console.error('Error al eliminar proceso:', error);
          alert('Error al eliminar el proceso');
        }
      });
    }
  }

  crearNuevoProceso() {
    this.router.navigate(['/crear-proceso']);
  }
}
