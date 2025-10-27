import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionFacade } from '../permissions.facade';
import { PermissionListComponent } from '../permission-list/permission-list.component';
import { PermissionFormComponent } from '../permission-form/permission-form.component';

@Component({
  selector: 'app-permission-page',
  standalone: true,
  imports: [CommonModule, PermissionListComponent, PermissionFormComponent],
  templateUrl: './permission-page.component.html'
})
export class PermissionPageComponent {
  facade = inject(PermissionFacade);

  constructor() {
    // 👇 carga inicial con signals (sin ngOnInit)
    effect(() => {
      this.facade.loadAll();
    }, { allowSignalWrites: true });
  }
}
