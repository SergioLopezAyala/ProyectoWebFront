import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common'; // <-- agrega esto

@Component({
  selector: "app-editar-proceso",
  standalone: true,
  imports: [FormsModule, NgIf], // <-- agrega NgIf aquí
  templateUrl: "./editar-proceso.html",
  styleUrl: "./editar-proceso.css"
})
export class EditarProceso {

  nombreProceso: string = "Gestión de reservas";
  descripcionProceso: string = "Proceso de control y administración de reservas de habitaciones.";
  categoriaProceso: string = "servicio";
  estadoProceso: string = "borrador";
  permisoEdicionProceso: boolean = true; // Solo los usuarios con permiso pueden editar
  mensajeHistorialProceso: string = "";

  guardarCambios() {
    if (!this.permisoEdicionProceso) {
      alert("No tienes permisos para realizar esta acción.");
      return;
    }

    const fecha = new Date().toLocaleString();

    console.log("Proceso actualizado: ", {

      nombre: this.nombreProceso,
      descripcion: this.descripcionProceso,
      categoria: this.categoriaProceso,
      estado: this.estadoProceso,
      fecha

    });

    this.mensajeHistorialProceso = `Cambios guardados el ${fecha}`;

  }

  cancelar() {
    console.log("Edición cancelada");
    this.mensajeHistorialProceso = "Edición cancelada";
  }
}
