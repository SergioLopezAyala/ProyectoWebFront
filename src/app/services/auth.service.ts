import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Guardar token o información de usuario si es necesario
        console.log('Login exitoso:', response);
      })
    );
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    // Implementar lógica de autenticación si es necesario
    return false;
  }

  // Método para cerrar sesión
  logout(): void {
    // Limpiar información de usuario
    console.log('Logout ejecutado');
  }
}