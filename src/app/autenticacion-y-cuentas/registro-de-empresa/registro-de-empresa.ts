import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrganizationService, OrganizationDto } from '../../services/organization.service';
import { Router } from '@angular/router';

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
  direccionEmpresa: string = '';
  telefonoEmpresa: string = '';
  
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private organizationService: OrganizationService,
    private router: Router
  ) {}

  onRegistrarEmpresa() {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;

    if (!this.nombreEmpresa || !this.nitEmpresa || !this.correoEmpresa || !this.adminEmpresa) {
      this.errorMessage = 'Por favor complete todos los campos obligatorios';
      this.loading = false;
      return;
    }

    const organization: OrganizationDto = {
      name: this.nombreEmpresa,
      nit: this.nitEmpresa,
      email: this.correoEmpresa,
      direccion: this.direccionEmpresa,
      telefono: this.telefonoEmpresa,
      descripcion: `Organización creada con administrador: ${this.adminEmpresa}`
    };

    this.organizationService.crear(organization).subscribe({
      next: (response) => {
        console.log('Empresa registrada exitosamente:', response);
        this.successMessage = 'Empresa registrada exitosamente';
        this.loading = false;
        
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error al registrar empresa:', error);
        this.errorMessage = 'Error al registrar la empresa. Intente nuevamente.';
        this.loading = false;
      }
    });
  }
}