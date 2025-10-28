import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GatewayDto {
  id?: number;
  nombre: string;
  descripcion?: string;
  tipo: string;
  configuracion?: any;
  activo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  private baseUrl = '/api/gateways';

  constructor(private http: HttpClient) {}

  listar(): Observable<GatewayDto[]> {
    return this.http.get<GatewayDto[]>(`${this.baseUrl}/list`);
  }

  obtener(id: number): Observable<GatewayDto> {
    return this.http.get<GatewayDto>(`${this.baseUrl}/get/${id}`);
  }

  crear(gateway: GatewayDto): Observable<GatewayDto> {
    return this.http.post<GatewayDto>(`${this.baseUrl}/create`, gateway);
  }

  actualizar(id: number, gateway: GatewayDto): Observable<GatewayDto> {
    return this.http.put<GatewayDto>(`${this.baseUrl}/update/${id}`, gateway);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}