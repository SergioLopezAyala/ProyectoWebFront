import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-rol-de-proceso',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-rol-de-proceso.html',
  styleUrl: './crear-rol-de-proceso.css'
})
export class CrearRolDeProceso {
  nombreRol: string = '';
  descripcion: string = '';

  onCrearRol() {
    if (this.nombreRol && this.descripcion) {
      console.log('Rol creado:', {
        nombre: this.nombreRol,
        descripcion: this.descripcion
      });

      this.nombreRol = '';
      this.descripcion = '';
    }
  }
}
