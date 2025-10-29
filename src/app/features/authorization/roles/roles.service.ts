import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, throwError, Observable } from 'rxjs';
import { CreateRoleDTO } from './models/create-role.dto';
import { UpdateRoleDTO } from './models/update-role.dto';
import { RoleResponseDTO } from './models/role-response.dto';
import { ApiResponse } from '../../../core/models/api-response.model';
import { DataTableService } from '../../../core/services/datatable.service';
import { DataTableRequest, DataTableResponse } from '../../../core/models/datatable.model';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private apiUrl = '/api/roles';

  constructor(private http: HttpClient, private dataTable: DataTableService) {}

  getRoles(
    request: DataTableRequest
  ): Observable<{ data: DataTableResponse<RoleResponseDTO>; message: string }> {
    return this.dataTable
      .fetchPage<RoleResponseDTO>(this.apiUrl, request)
      .pipe(
        map(res => ({ data: res.data, message: res.message })),
        catchError(err => {
          const msg = err.error?.message || 'Error al cargar roles';
          return throwError(() => new Error(msg));
        })
      );
  }

  create(dto: CreateRoleDTO) {
    return this.http.post<ApiResponse<RoleResponseDTO>>(this.apiUrl, dto).pipe(
      map(res => ({ data: res.data, message: res.message })),
      catchError(err => {
        const msg = err.error?.message || 'Error al crear rol';
        return throwError(() => new Error(msg));
      })
    );
  }

  update(id: string, dto: UpdateRoleDTO) {
    return this.http.put<ApiResponse<RoleResponseDTO>>(`${this.apiUrl}/${id}`, dto).pipe(
      map(res => ({ data: res.data, message: res.message })),
      catchError(err => {
        const msg = err.error?.message || 'Error al actualizar rol';
        return throwError(() => new Error(msg));
      })
    );
  }

  delete(id: string) {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`).pipe(
      map(res => ({ data: res.data, message: res.message })),
      catchError(err => {
        const msg = err.error?.message || 'Error al eliminar rol';
        return throwError(() => new Error(msg));
      })
    );
  }

  // 👇 Nuevo método: asignar permisos a un rol
  assignPermissions(roleId: string, permissionIds: string[]) {
    return this.http.post<ApiResponse<void>>(
      `${this.apiUrl}/${roleId}/permissions`,
      { permissionIds }
    ).pipe(
      map(res => ({ data: res.data, message: res.message })),
      catchError(err => {
        const msg = err.error?.message || 'Error al asignar permisos';
        return throwError(() => new Error(msg));
      })
    );
  }
}
