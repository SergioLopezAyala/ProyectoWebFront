import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-de-empresa',
  imports: [FormsModule],
  templateUrl: './registro-de-empresa.html',
  styleUrl: './registro-de-empresa.css'
})
export class RegistroDeEmpresa {
  nombreEmpresa: string = '';
  nitEmpresa: string = '';
  correoEmpresa: string = '';
  adminEmpresa: string = '';

  onRegistrarEmpresa() {
    if (this.nombreEmpresa && this.nitEmpresa && this.correoEmpresa && this.adminEmpresa) {
      console.log('Empresa registrada:', {
        nombre: this.nombreEmpresa,
        nit: this.nitEmpresa,
        correo: this.correoEmpresa,
        administradorInicial: this.adminEmpresa
      });
      console.log("Registro exitoso");
    } else {
      console.log("Registro no exitoso");
    }
  }
}