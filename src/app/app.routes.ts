import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
// import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { PermissionPageComponent } from './features/authorization/permissions/permission-page/permission-page.component';
import { RolePageComponent } from './features/authorization/roles/role-page/role-page.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'permissions', component: PermissionPageComponent },
      { path: 'roles', component: RolePageComponent },
      { path: '', redirectTo: 'permissions', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'admin' }
];

