import { Component, inject, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionFacade } from '../permissions.facade';
import { PermissionFormComponent } from '../permission-form/permission-form.component';
import { PermissionListComponent } from '../permission-list/permission-list.component';
import { PermissionResponseDTO } from '../models/permission-response.dto';
import { CreatePermissionDTO } from '../models/create-permission.dto';
import { UpdatePermissionDTO } from '../models/update-permission.dto';
import { TableStateService } from '../../../../core/state/table-state.service';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-permission-page',
  standalone: true,
  imports: [CommonModule, PermissionFormComponent, PermissionListComponent],
  templateUrl: './permission-page.component.html'
})
export class PermissionPageComponent {
  public facade = inject(PermissionFacade);
  public tableState = inject<TableStateService<PermissionResponseDTO>>(TableStateService);
  public isFormOpen = signal(false);

  constructor() {
    // 👇 carga inicial de la tabla con el estado actual del TableStateService
    effect(() => {
      this.facade.load();
    });
  }

  onEdit(p: PermissionResponseDTO) {
    this.facade.setEditingPermission(p);
    this.isFormOpen.set(true);
  }

  onRemove(id: string) {
    this.facade.delete(id);
  }

  onSave(dto: CreatePermissionDTO | UpdatePermissionDTO) {
    const editing = this.facade.editingPermission();
    if (editing) {
      this.facade.update(editing.id, dto as UpdatePermissionDTO);
    } else {
      this.facade.create(dto as CreatePermissionDTO);
    }
    this.isFormOpen.set(false);
    this.facade.setEditingPermission(null);
  }

  onClose() {
    this.isFormOpen.set(false);
    this.facade.setEditingPermission(null);
  }

  onNew() {
    this.facade.setEditingPermission(null);
    this.isFormOpen.set(true);
  }

  onCancel() {
    this.isFormOpen.set(false);
    this.facade.setEditingPermission(null);
  }

  onToggleForm() {
    this.isFormOpen.set(!this.isFormOpen());
  }

  // 👇 faltaban estos handlers para la tabla
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
