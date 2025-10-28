import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProcessRoleService, ProcessRoleDto } from '../../services/process-role.service';
import { Router } from '@angular/router';

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
  organizacionId: number | null = null;
  
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private processRoleService: ProcessRoleService,
    private router: Router
  ) {}

  onCrearRol() {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;

    if (!this.nombreRol || !this.descripcion) {
      this.errorMessage = 'Por favor complete todos los campos obligatorios';
      this.loading = false;
      return;
    }

    const role: ProcessRoleDto = {
      nombre: this.nombreRol,
      descripcion: this.descripcion,
      organizacionId: this.organizacionId || undefined
    };

    this.processRoleService.crear(role).subscribe({
      next: (response) => {
        console.log('Rol creado exitosamente:', response);
        this.successMessage = 'Rol creado exitosamente';
        this.loading = false;
        
        // Limpiar formulario y redirigir
        setTimeout(() => {
          this.limpiarFormulario();
          // Aquí podrías redirigir a una página de lista de roles si existe
        }, 2000);
      },
      error: (error) => {
        console.error('Error al crear rol:', error);
        this.errorMessage = 'Error al crear el rol. Intente nuevamente.';
        this.loading = false;
      }
    });
  }

  limpiarFormulario() {
    this.nombreRol = '';
    this.descripcion = '';
    this.organizacionId = null;
  }

  cancelar() {
    this.limpiarFormulario();
    this.router.navigate(['/crear-proceso']);
  }
}
