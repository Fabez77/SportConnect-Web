import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, throwError, Observable } from 'rxjs';
import { PermissionResponseDTO } from './models/permission-response.dto';
import { CreatePermissionDTO } from './models/create-permission.dto';
import { UpdatePermissionDTO } from './models/update-permission.dto';
import { DataTableService } from '../../../core/services/datatable.service';
import { DataTableRequest, DataTableResponse } from '../../../core/models/datatable.model';
import { ApiResponse } from '../../../core/models/api-response.model';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  // 👇 Centralizamos la URL base
  private apiUrl = '/api/permissions';

  constructor(private http: HttpClient, private dataTable: DataTableService) { }

  // Aquí ya no serializas nada, solo delegas
  getPermissions(
    request: DataTableRequest
  ): Observable<{ data: DataTableResponse<PermissionResponseDTO>; message: string }> {
    return this.dataTable
      .fetchPage<PermissionResponseDTO>(this.apiUrl, request)
      .pipe(
        map(res => {
          return { data: res.data, message: res.message };
        }),
        catchError(err => {
          const msg = err.error?.message || 'Error inesperado al cargar permisos';
          return throwError(() => new Error(msg));
        })
      );
  }


  create(dto: CreatePermissionDTO) {
    return this.http.post<ApiResponse<PermissionResponseDTO>>(this.apiUrl, dto).pipe(
      map(res => ({ data: res.data, message: res.message })),
      catchError(err => {
        const msg = err.error?.message || 'Error al crear permiso';
        return throwError(() => new Error(msg));
      })
    );
  }

  update(id: string, dto: UpdatePermissionDTO) {
    return this.http.put<ApiResponse<PermissionResponseDTO>>(`${this.apiUrl}/${id}`, dto).pipe(
      map(res => ({ data: res.data, message: res.message })),
      catchError(err => {
        const msg = err.error?.message || 'Error al actualizar permiso';
        return throwError(() => new Error(msg));
      })
    );
  }

  delete(id: string) {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`).pipe(
      map(res => ({ data: res.data, message: res.message })),
      catchError(err => {
        const msg = err.error?.message || 'Error al eliminar permiso';
        return throwError(() => new Error(msg));
      })
    );
  }
}
