import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

interface Proceso {
  idProceso: number;
  nombreProceso: string;
  categoriaProceso: string;
  estadoProceso: string;
  actividadesProceso: string[];
  arcosProceso: string[];
  gatewaysProceso: string[];
  fecha: string;
  duracion: number;
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

  // Modal
  modalOpen: boolean = false;
  procesoSeleccionado: Proceso | null = null;

  procesos: Proceso[] = [
    {
      idProceso: 1,
      nombreProceso: 'Gestión de reservas',
      categoriaProceso: 'servicio',
      estadoProceso: 'activo',
      actividadesProceso: ['Revisar solicitud', 'Confirmar reserva', 'Notificar cliente'],
      arcosProceso: ['Inicio-Fin'],
      gatewaysProceso: ['Validación'],
      fecha: '2025-10-01',
      duracion: 7
    },
    {
      idProceso: 2,
      nombreProceso: 'Limpieza de habitaciones',
      categoriaProceso: 'operativo',
      estadoProceso: 'inactivo',
      actividadesProceso: ['Asignar personal', 'Verificar limpieza', 'Registrar estado'],
      arcosProceso: ['Aprobación'],
      gatewaysProceso: ['Control calidad'],
      fecha: '2025-09-20',
      duracion: 3
    }
  ];

  toggleFiltro() {
    this.mostrarFiltro = !this.mostrarFiltro;
  }

  filtrarProcesos(): Proceso[] {
    const term = this.terminoBusqueda.trim().toLowerCase();
    return this.procesos.filter(p => {
      const coincideBusqueda =
        term === '' ||
        p.nombreProceso.toLowerCase().includes(term) ||
        p.categoriaProceso.toLowerCase().includes(term);

      const coincideEstado = this.filtroEstado
        ? p.estadoProceso === this.filtroEstado
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

  abrirModal(p: Proceso) {
    this.procesoSeleccionado = p;
    this.modalOpen = true;
    // evitar scroll de fondo (opcional)
    document.body.style.overflow = 'hidden';
  }

  cerrarModal() {
    this.modalOpen = false;
    this.procesoSeleccionado = null;
    document.body.style.overflow = '';
  }

  verDetalles(p: Proceso) {
    this.abrirModal(p);
  }
}
