import { Injectable, signal } from '@angular/core';
import { PermissionService } from './permissions.service';
import { PermissionResponseDTO } from './models/permission-response.dto';
import { CreatePermissionDTO } from './models/create-permission.dto';
import { UpdatePermissionDTO } from './models/update-permission.dto';

@Injectable({ providedIn: 'root' })
export class PermissionFacade {
  permissions = signal<PermissionResponseDTO[]>([]);
  message = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  // 👇 nuevo signal para el permiso en edición
  editingPermission = signal<PermissionResponseDTO | null>(null);

  constructor(private service: PermissionService) {}

  loadAll() {
    this.service.getAll().subscribe({
      next: (res) => {
        this.permissions.set(res.data);
        this.message.set(res.message);
        this.errorMessage.set(null);
      },
      error: (err) => {
        this.errorMessage.set(err.message);
        this.message.set(null);
      }
    });
  }

  create(dto: CreatePermissionDTO) {
    this.service.create(dto).subscribe({
      next: (res) => {
        this.permissions.update(list => [...list, res.data]);
        this.message.set(res.message);
        this.errorMessage.set(null);
      },
      error: (err) => {
        this.errorMessage.set(err.message);
        this.message.set(null);
      }
    });
  }

  update(id: string, dto: UpdatePermissionDTO) {
    this.service.update(id, dto).subscribe({
      next: (res) => {
        this.permissions.update(list =>
          list.map(p => (p.id === id ? res.data : p))
        );
        this.message.set(res.message);
        this.errorMessage.set(null);
        this.editingPermission.set(null); // 👈 limpiar edición
      },
      error: (err) => {
        this.errorMessage.set(err.message);
        this.message.set(null);
      }
    });
  }

  delete(id: string) {
    this.service.delete(id).subscribe({
      next: (res) => {
        this.permissions.update(list => list.filter(p => p.id !== id));
        this.message.set(res.message);
        this.errorMessage.set(null);
      },
      error: (err) => {
        this.errorMessage.set(err.message);
        this.message.set(null);
      }
    });
  }

  // 👇 método que faltaba
  setEditingPermission(p: PermissionResponseDTO | null) {
    this.editingPermission.set(p);
  }
}
