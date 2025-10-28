// core/mappers/datatable.mapper.ts
import { HttpParams } from '@angular/common/http';
import { DataTableRequest } from '../models/datatable.model';

export class DataTableMapper {
    static toHttpParams(request: DataTableRequest): HttpParams {
        let params = new HttpParams()
            .set('page', request.page.toString())
            .set('size', request.size.toString());

        if (request.search) {
            params = params.set('search', request.search);
        }

        // Solo añadir sort si hay campo
        if (request.sortBy) {
            params = params.set('sortBy', request.sortBy);
            if (request.direction) {
                params = params.set('direction', request.direction.toLowerCase());
            }
        }

        if (request.filters) {
            Object.entries(request.filters).forEach(([key, value]) => {
                if (value) {
                    params = params.set(key, value);
                }
            });
        }

        return params;
    }

}
