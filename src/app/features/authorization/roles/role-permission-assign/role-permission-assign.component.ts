import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

import { PermissionFacade } from '../../permissions/permissions.facade';
import { RoleFacade } from '../roles.facade';

@Component({
  selector: 'app-role-permission-assign',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSlideToggleModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './role-permission-assign.component.html'
})
export class RolePermissionAssignComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  permissionFacade = inject(PermissionFacade);
  roleFacade = inject(RoleFacade);

  roleId!: string;
  selected = signal<Set<string>>(new Set());

  // 👇 effect declarado como propiedad, no en ngOnInit
  syncRolePermissions = effect(() => {
    this.selected.set(new Set(this.roleFacade.rolePermissions()));
  });

  ngOnInit() {
    this.roleId = this.route.snapshot.paramMap.get('id')!;
    this.permissionFacade.load();
    this.roleFacade.loadRolePermissions(this.roleId);
  }

  togglePermission(id: string, checked: boolean) {
    const current = new Set(this.selected());
    checked ? current.add(id) : current.delete(id);
    this.selected.set(current);
  }

  save() {
    this.roleFacade.assignPermissions(this.roleId, Array.from(this.selected()));
    this.router.navigate(['/admin/roles']);
  }

  back() {
    this.router.navigate(['/admin/roles']);
  }
}
