import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
// import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { PermissionPageComponent } from './features/authorization/permissions/permission-page/permission-page.component';

export const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            { path: 'permissions', component: PermissionPageComponent },
            { path: '', redirectTo: 'permissions', pathMatch: 'full' }
        ]
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            { path: 'permissions', component: PermissionPageComponent }, // ejemplo
            { path: '', redirectTo: 'permissions', pathMatch: 'full' }
        ]
    },
    //   {
    //     path: '',
    //     component: ClientLayoutComponent,
    //     children: [
    //       { path: '', component: TestComponent } // ruta por defecto
    //     ]
    //   },
    { path: '**', redirectTo: '' } // fallback
];
