import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionFacade } from '../permissions.facade';
import { PermissionResponseDTO } from '../models/permission-response.dto';

@Component({
  selector: 'app-permission-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './permission-list.component.html'
})
export class PermissionListComponent {
  private facade = inject(PermissionFacade);

  // 👇 público para que el template lo vea
  public permissions = this.facade.permissions;

  constructor() {
    // 👇 carga inicial
    effect(() => {
      this.facade.loadAll();
    }, { allowSignalWrites: true });
  }

  // 👇 públicos para que el template los vea
  public edit(p: PermissionResponseDTO) {
    this.facade.setEditingPermission(p);
  }

  public remove(id: string) {
    this.facade.delete(id);
  }
}
