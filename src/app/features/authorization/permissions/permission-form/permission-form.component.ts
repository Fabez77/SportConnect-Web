import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PermissionFacade } from '../permissions.facade';
import { CreatePermissionDTO } from '../models/create-permission.dto';
import { UpdatePermissionDTO } from '../models/update-permission.dto';

@Component({
  selector: 'app-permission-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './permission-form.component.html'
})
export class PermissionFormComponent {
  public facade = inject(PermissionFacade);

  public model = signal<Partial<CreatePermissionDTO & UpdatePermissionDTO>>({});
  public isOpen = signal<boolean>(true); // 👈 controla el colapso

  constructor() {
    effect(() => {
      const editing = this.facade.editingPermission();
      this.model.set(editing ? { ...editing } : {});
    });
  }

  public onSubmit() {
    const editing = this.facade.editingPermission();
    const dto = this.model();

    if (editing) {
      this.facade.update(editing.id, dto as UpdatePermissionDTO);
    } else {
      this.facade.create(dto as CreatePermissionDTO);
    }

    this.model.set({});
    this.facade.setEditingPermission(null);
    this.isOpen.set(false); // 👈 colapsa después de guardar
  }

  public toggle() {
    this.isOpen.update(open => !open);
  }

  public openAndReset() {
    this.isOpen.set(true);
    this.model.set({});
    this.facade.setEditingPermission(null);
  }
}
