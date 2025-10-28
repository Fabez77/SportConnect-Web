// src/app/core/services/datatable.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataTableRequest, DataTableResponse } from '../models/datatable.model';
import { DataTableMapper } from '../mappers/datatable.mapper';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
    providedIn: 'root'
})
export class DataTableService {
    constructor(private http: HttpClient) { }

    /**
     * Método genérico para consumir endpoints de DataTable
     * @param url endpoint del backend (ej: /api/permissions/datatable)
     * @param request objeto con page, size, sortBy, direction, filters
     */
    // datatable.service.ts
    fetchPage<T>(url: string, request: DataTableRequest) {
        const params = DataTableMapper.toHttpParams(request);
        return this.http.get<ApiResponse<DataTableResponse<T>>>(url, { params });
    }

}
