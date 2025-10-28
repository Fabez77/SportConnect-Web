import { Injectable, signal } from '@angular/core';
import { PermissionService } from './permissions.service';
import { PermissionResponseDTO } from './models/permission-response.dto';
import { CreatePermissionDTO } from './models/create-permission.dto';
import { UpdatePermissionDTO } from './models/update-permission.dto';
import { TableStateService } from '../../../core/state/table-state.service';
import { DataTableRequest } from '../../../core/models/datatable.model';

@Injectable({ providedIn: 'root' })
export class PermissionFacade {
  message = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  editingPermission = signal<PermissionResponseDTO | null>(null);
  loading = signal<boolean>(false);

  constructor(
    private service: PermissionService,
    private tableState: TableStateService<PermissionResponseDTO>
  ) {}

  load() {
    this.loading.set(true);

    const request: DataTableRequest = {
      page: this.tableState.pageIndex(),
      size: this.tableState.pageSize(),
      sortBy: this.tableState.sort().active,
      direction: this.tableState.sort().direction.toUpperCase() as 'ASC' | 'DESC',
      filters: { search: this.tableState.filter() }
    };

    this.service.getPermissions(request).subscribe({
      next: (res) => {
        this.tableState.setData(res.data.data);                // sincroniza data
        this.tableState.setTotalItems(res.data.totalElements); // sincroniza total
        this.message.set(res.message);
        this.errorMessage.set(null);
        this.loading.set(false);
      },
      error: (err) => this.handleError(err)
    });
  }

  create(dto: CreatePermissionDTO) {
    this.loading.set(true);
    this.service.create(dto).subscribe({
      next: (res) => {
        this.message.set(res.message);
        this.errorMessage.set(null);
        this.load(); // recarga la tabla
      },
      error: (err) => this.handleError(err)
    });
  }

  update(id: string, dto: UpdatePermissionDTO) {
    this.loading.set(true);
    this.service.update(id, dto).subscribe({
      next: (res) => {
        this.message.set(res.message);
        this.errorMessage.set(null);
        this.editingPermission.set(null);
        this.load();
      },
      error: (err) => this.handleError(err)
    });
  }

  delete(id: string) {
    this.loading.set(true);
    this.service.delete(id).subscribe({
      next: (res) => {
        this.message.set(res.message);
        this.errorMessage.set(null);
        this.load();
      },
      error: (err) => this.handleError(err)
    });
  }

  setEditingPermission(p: PermissionResponseDTO | null) {
    this.editingPermission.set(p);
  }

  private handleError(err: any) {
    this.errorMessage.set(err.message || 'Error inesperado');
    this.message.set(null);
    this.loading.set(false);
  }
}
