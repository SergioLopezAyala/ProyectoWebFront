import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProcesoDto {
  id?: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  estado: string;
  organizacionId?: number;
  actividadesProceso?: string[];
  arcosProceso?: string[];
  gatewaysProceso?: string[];
}

export interface ProcessHistory {
  id: number;
  procesoId: number;
  accion: string;
  fecha: string;
  actor: string;
  detalles?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {
  private baseUrl = '/api/processes';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    // Agregar actor email si está disponible
    const actor = 'admin@example.com'; // Podría obtenerse del usuario autenticado
    return new HttpHeaders({
      'X-Actor-Email': actor
    });
  }

  listar(orgId?: number, estado?: string): Observable<ProcesoDto[]> {
    const params: any = {};
    if (orgId) params.orgId = orgId;
    if (estado) params.status = estado;
    
    return this.http.get<ProcesoDto[]>(`${this.baseUrl}/list`, { params });
  }

  obtener(id: number): Observable<ProcesoDto> {
    return this.http.get<ProcesoDto>(`${this.baseUrl}/get/${id}`);
  }

  crear(proceso: ProcesoDto): Observable<ProcesoDto> {
    return this.http.post<ProcesoDto>(`${this.baseUrl}/create`, proceso, { 
      headers: this.getHeaders() 
    });
  }

  actualizar(id: number, proceso: ProcesoDto): Observable<ProcesoDto> {
    return this.http.put<ProcesoDto>(`${this.baseUrl}/update/${id}`, proceso, { 
      headers: this.getHeaders() 
    });
  }

  eliminar(id: number, hardDelete = false): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, { 
      params: { hardDelete: hardDelete },
      headers: this.getHeaders() 
    });
  }

  historial(id: number): Observable<ProcessHistory[]> {
    return this.http.get<ProcessHistory[]>(`${this.baseUrl}/${id}/history`);
  }
}