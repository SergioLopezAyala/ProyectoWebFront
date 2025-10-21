import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-eliminar-proceso',
  standalone: true,
  imports: [NgIf],
  templateUrl: './eliminar-proceso.html',
  styleUrl: './eliminar-proceso.css'
})
export class EliminarProceso {
  nombreProceso: string = 'Gestión de reservas';
  estadoProceso: string = 'activo';
  confirmado: boolean = false;
  mensajeConfirmacion: string = '';

  confirmarEliminacion() {
    const confirmar = confirm(
      `¿Confirmas eliminar el proceso "${this.nombreProceso}"?`
    );

    if (confirmar) {
      this.confirmado = true;
      this.estadoProceso = 'inactivo';
      this.mensajeConfirmacion = `El proceso "${this.nombreProceso}" ha sido marcado como inactivo correctamente.`;
      console.log('Proceso eliminado (inactivo):', this.nombreProceso);
    }
  }

  cancelar() {
    this.mensajeConfirmacion = 'Operación cancelada.';
    console.log('Eliminación cancelada');
  }
}
