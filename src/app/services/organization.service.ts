import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrganizationDto {
  id?: number;
  name: string;
  descripcion?: string;
  nit?: string;
  direccion?: string;
  telefono?: string;
  email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private baseUrl = '/api/organizations';

  constructor(private http: HttpClient) {}

  listar(): Observable<OrganizationDto[]> {
    return this.http.get<OrganizationDto[]>(`${this.baseUrl}/list`);
  }

  obtener(id: number): Observable<OrganizationDto> {
    return this.http.get<OrganizationDto>(`${this.baseUrl}/get/${id}`);
  }

  crear(organization: OrganizationDto): Observable<OrganizationDto> {
    return this.http.post<OrganizationDto>(`${this.baseUrl}/create`, organization);
  }

  actualizar(id: number, organization: OrganizationDto): Observable<OrganizationDto> {
    return this.http.put<OrganizationDto>(`${this.baseUrl}/update/${id}`, organization);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}