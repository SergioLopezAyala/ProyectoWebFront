import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProcessRoleDto {
  id?: number;
  nombre: string;
  descripcion?: string;
  organizacionId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProcessRoleService {
  private baseUrl = '/api/process-roles';

  constructor(private http: HttpClient) {}

  listar(orgId?: number): Observable<ProcessRoleDto[]> {
    const params: any = {};
    if (orgId) params.orgId = orgId;
    return this.http.get<ProcessRoleDto[]>(`${this.baseUrl}/list`, { params });
  }

  crear(role: ProcessRoleDto): Observable<ProcessRoleDto> {
    return this.http.post<ProcessRoleDto>(`${this.baseUrl}/create`, role);
  }

  actualizar(id: number, role: ProcessRoleDto): Observable<ProcessRoleDto> {
    return this.http.put<ProcessRoleDto>(`${this.baseUrl}/update/${id}`, role);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, {
      headers: { 'X-Confirm-Delete': 'true' }
    });
  }
}