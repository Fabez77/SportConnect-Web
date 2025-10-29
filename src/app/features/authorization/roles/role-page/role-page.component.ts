import { Component, inject, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleFacade } from '../roles.facade';
import { RoleFormComponent } from '../role-form/role-form.component';
import { RoleListComponent } from '../role-list/role-list.component';
import { RoleResponseDTO } from '../models/role-response.dto';
import { CreateRoleDTO } from '../models/create-role.dto';
import { UpdateRoleDTO } from '../models/update-role.dto';
import { TableStateService } from '../../../../core/state/table-state.service';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-role-page',
  standalone: true,
  imports: [CommonModule, RoleFormComponent, RoleListComponent],
  templateUrl: './role-page.component.html'
})
export class RolePageComponent {
  public facade = inject(RoleFacade);
  public tableState = inject<TableStateService<RoleResponseDTO>>(TableStateService);
  public isFormOpen = signal(false);

  constructor() {
    effect(() => {
      this.facade.load();
    });
  }

  onEdit(role: RoleResponseDTO) {
    this.facade.setEditingRole(role);
    this.isFormOpen.set(true);
  }

  onRemove(id: string) {
    this.facade.delete(id);
  }

  onSave(dto: CreateRoleDTO | UpdateRoleDTO) {
    const editing = this.facade.editingRole();
    if (editing) {
      this.facade.update(editing.id, dto as UpdateRoleDTO);
    } else {
      this.facade.create(dto as CreateRoleDTO);
    }
    this.isFormOpen.set(false);
    this.facade.setEditingRole(null);
  }

  onClose() {
    this.isFormOpen.set(false);
    this.facade.setEditingRole(null);
  }

  onNew() {
    this.facade.setEditingRole(null);
    this.isFormOpen.set(true);
  }

  onCancel() {
    this.isFormOpen.set(false);
    this.facade.setEditingRole(null);
  }

  onToggleForm() {
    this.isFormOpen.set(!this.isFormOpen());
  }

  onPageChange(event: PageEvent) {
    this.tableState.setPage(event.pageIndex, event.pageSize);
    this.facade.load();
  }

  onFilter(value: string) {
    this.tableState.setFilter(value);
    this.facade.load();
  }

  onSort(event: Sort) {
    this.tableState.setSort(event.active, event.direction);
    this.facade.load();
  }
}
