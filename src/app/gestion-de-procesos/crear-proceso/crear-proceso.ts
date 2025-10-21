import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  crearProceso() {
    if (this.nombreProceso && this.descripcionProceso && this.categoriaProceso) {

      console.log("Proceso creado:", {
        nombre: this.nombreProceso,
        descripcion: this.descripcionProceso,
        categoria: this.categoriaProceso,
        estado: this.estadoProceso
      });

    } else {

      console.log("Proceso no creado")

    }
  }

  cancelar() {
    this.nombreProceso = '';
    this.descripcionProceso = '';
    this.categoriaProceso = '';
    this.estadoProceso = 'borrador';
    console.log('Creación de proceso cancelada');
  }
}
