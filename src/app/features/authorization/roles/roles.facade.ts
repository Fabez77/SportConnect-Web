import { Injectable, signal } from '@angular/core';
import { RoleService } from './roles.service';
import { RoleResponseDTO } from './models/role-response.dto';
import { CreateRoleDTO } from './models/create-role.dto';
import { UpdateRoleDTO } from './models/update-role.dto';
import { TableStateService } from '../../../core/state/table-state.service';
import { DataTableRequest } from '../../../core/models/datatable.model';

@Injectable({ providedIn: 'root' })
export class RoleFacade {
  message = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  editingRole = signal<RoleResponseDTO | null>(null);
  loading = signal<boolean>(false);

  constructor(
    private service: RoleService,
    private tableState: TableStateService<RoleResponseDTO>
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

    this.service.getRoles(request).subscribe({
      next: (res) => {
        this.tableState.setData(res.data.data);
        this.tableState.setTotalItems(res.data.totalElements);
        this.message.set(res.message);
        this.errorMessage.set(null);
        this.loading.set(false);
      },
      error: (err) => this.handleError(err)
    });
  }

  create(dto: CreateRoleDTO) {
    this.loading.set(true);
    this.service.create(dto).subscribe({
      next: (res) => {
        this.message.set(res.message);
        this.errorMessage.set(null);
        this.load();
      },
      error: (err) => this.handleError(err)
    });
  }

  update(id: string, dto: UpdateRoleDTO) {
    this.loading.set(true);
    this.service.update(id, dto).subscribe({
      next: (res) => {
        this.message.set(res.message);
        this.errorMessage.set(null);
        this.editingRole.set(null);
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

  assignPermissions(roleId: string, permissionIds: string[]) {
    this.loading.set(true);
    this.service.assignPermissions(roleId, permissionIds).subscribe({
      next: (res) => {
        this.message.set(res.message);
        this.errorMessage.set(null);
        this.load(); // opcional: recargar tabla si se refleja
      },
      error: (err) => this.handleError(err)
    });
  }

  setEditingRole(role: RoleResponseDTO | null) {
    this.editingRole.set(role);
  }

  private handleError(err: any) {
    this.errorMessage.set(err.message || 'Error inesperado');
    this.message.set(null);
    this.loading.set(false);
  }
}
