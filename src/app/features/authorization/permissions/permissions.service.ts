import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, throwError } from 'rxjs';
import { PermissionResponseDTO } from './models/permission-response.dto';
import { CreatePermissionDTO } from './models/create-permission.dto';
import { UpdatePermissionDTO } from './models/update-permission.dto';
import { ApiResponse } from '../../../core/models/api-response.model'; // 👈 aquí lo importas

@Injectable({ providedIn: 'root' })
export class PermissionService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ApiResponse<PermissionResponseDTO[]>>('/api/permissions').pipe(
      map(res => ({ data: res.data, message: res.message })),
      catchError(err => {
        const msg = err.error?.message || 'Error inesperado al cargar permisos';
        return throwError(() => new Error(msg));
      })
    );
  }

  create(dto: CreatePermissionDTO) {
    return this.http.post<ApiResponse<PermissionResponseDTO>>('/api/permissions', dto).pipe(
      map(res => ({ data: res.data, message: res.message })),
      catchError(err => {
        const msg = err.error?.message || 'Error al crear permiso';
        return throwError(() => new Error(msg));
      })
    );
  }

  update(id: string, dto: UpdatePermissionDTO) {
    return this.http.put<ApiResponse<PermissionResponseDTO>>(`/api/permissions/${id}`, dto).pipe(
      map(res => ({ data: res.data, message: res.message })),
      catchError(err => {
        const msg = err.error?.message || 'Error al actualizar permiso';
        return throwError(() => new Error(msg));
      })
    );
  }

  delete(id: string) {
    return this.http.delete<ApiResponse<void>>(`/api/permissions/${id}`).pipe(
      map(res => ({ data: res.data, message: res.message })),
      catchError(err => {
        const msg = err.error?.message || 'Error al eliminar permiso';
        return throwError(() => new Error(msg));
      })
    );
  }
}
