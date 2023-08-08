import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { UsersRoutingModule } from './users.routing';
import { ListUsersComponent } from './list-users/list-users.component';
import { AmaterialModule } from 'src/app/material/amaterial.module';
import { FrmCreateUserComponent } from './frm-create-user/frm-create-user.component';
import { FrmUpdateUserComponent } from './frm-update-user/frm-update-user.component';
import { FrmResetPasswordComponent } from './frm-reset-password/frm-reset-password.component';
import { AsignarPermisosComponent } from './asignar-permisos/asignar-permisos.component';
import { MatTreeNestedComponent } from './asignar-permisos/mat-tree-nested/mat-tree-nested.component';
import { AsignarEmpresasComponent } from './asignar-empresas/asignar-empresas.component';





@NgModule({
  declarations: [
    ListUsersComponent,
    FrmCreateUserComponent,
    FrmUpdateUserComponent,
    FrmResetPasswordComponent,
    AsignarPermisosComponent,
    MatTreeNestedComponent,
    AsignarEmpresasComponent
  ],
  imports: [
    CommonModule,
    // UsersRoutingModule,
    AmaterialModule
  ]
})
export class UsersModule { }
