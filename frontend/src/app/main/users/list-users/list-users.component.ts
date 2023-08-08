import { Component, OnInit, ViewChild } from '@angular/core';
import { FrmCreateUserComponent } from '../frm-create-user/frm-create-user.component';
import { UsersService } from '../../services/users.service';
import { SimpleResponse } from '../../objects/simple-response';
import { Usuario } from '../../objects/usuario';
import { showBasicAlert, showConfirmAlert } from 'src/app/shared/tools/swal-alerts';
import { FrmUpdateUserComponent } from '../frm-update-user/frm-update-user.component';
import { ModalsCustom } from 'src/app/shared/tools/modals-custom';
import { FrmResetPasswordComponent } from '../frm-reset-password/frm-reset-password.component';
import { AsignarPermisosComponent } from '../asignar-permisos/asignar-permisos.component';
import { AsignarEmpresasComponent } from '../asignar-empresas/asignar-empresas.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  displayedColumns: string[] = ["ID","Nombre","Empresa","Correo","Estado","Opción"];
  // dataSource:Usuario[] = [];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>();

  @ViewChild('tableSort') tableSort = new MatSort();


  constructor(
    private userService: UsersService,
    private modal:ModalsCustom
  ) {
    this.getUsers();

   }

  ngOnInit(): void {
    // this.homeService.asignarModuloActual({ id: 1 });
  }


  createUser =  () => {
    this.modal.openFrmDialog(FrmCreateUserComponent)
    .subscribe((result:SimpleResponse) =>{
        if (!result){return;}

        if (result.error) {
          showBasicAlert('Ups!',result.msg,'error')
          return;
        }

        showBasicAlert('Exito!','Usuario registrado correctamente','success')
        this.getUsers();
    });
  }

  updateUser = (usuario:Usuario) => {
    this.modal.openFrmDialog(FrmUpdateUserComponent,usuario)
    .subscribe((result:SimpleResponse) =>{
        if (!result){return;}

        if (result.error) {
          showBasicAlert('Ups!',result.msg,'error')
          return;
        }

        showBasicAlert('Exito!','Usuario actualizado correctamente','success')
        this.getUsers();
    });

  }


  updatePassword = (usuario:Usuario) => {

    this.modal.openFrmDialog(FrmResetPasswordComponent,usuario)
    .subscribe((result:SimpleResponse) =>{
        if (!result){return;}
        if (result.error) {
          showBasicAlert('Ups!',result.msg,'error')
          return;
        }
        showBasicAlert('Exito!','Contraseña actualizada correctamente','success')
    });

  }

  asignarPermisos = (usuario:Usuario) => {

    this.modal.openFrmDialogSendWidth(70,AsignarPermisosComponent,usuario)
    .subscribe((result:SimpleResponse) =>{
        if (!result){return;}
        if (result.error) {
          showBasicAlert('Ups!',result.msg,'error')
          return;
        }
        showBasicAlert('Exito!','Contraseña actualizada correctamente','success')
    });

  }



  deleteUser = (usuario: Usuario) => {

    showConfirmAlert(
      'Baja de usuario',
      `¿Al confirmar, el usuario: <b>${usuario.nombre}</b> no podrá acceder al portal?`,
      'question').then(
      result => {
        if (result.isConfirmed) {
          this.userService.deleteUser(usuario).subscribe({
            next: (data) => {
              const response:SimpleResponse = data;
              if (response.error){
                showBasicAlert('Ups',response.msg,'error')
              }

              showBasicAlert('Exito!','Usuario dado de baja correctamente.','success');
              this.getUsers();
            },
            error: (err) => {
              const response:SimpleResponse = err.error;
              showBasicAlert('Ups',response.msg,'error')
            }
          })
        }
      }

    )
  }

  getUsers = () => {
    this.userService.getUsers().subscribe({
      next: (data) => {
        const response:SimpleResponse = data;

        const res = response.payload/*.map((element:Usuario) => {

          return{
              id: element.id,
              nombre: capitalizeFirstLetter(`${element.nombre || ''} ${element.apellidoP || ''} ${element.apellidoM || ''}`),
              empresa: capitalizeFirstLetter(element.empresa?.razonSocial || ''),
              correo: element.correo,
              opcion: ''
            }
        });*/

        this.dataSource = new MatTableDataSource<Usuario>(res);;
        this.dataSource.sort = this.tableSort;
      },
      error: (err) => {
        showBasicAlert('Ups!',err.message,'error')
      }
    })
  }

  asignarEmpresas = (usuario: Usuario) => {
    this.modal.openFrmDialogSendWidth(70,AsignarEmpresasComponent,usuario)
    .subscribe((result:SimpleResponse) =>{
        if (!result){return;}
        if (result.error) {
          showBasicAlert('Ups!',result.msg,'error')
          return;
        }
        showBasicAlert('Exito!','Empresas asignadas correctamente','success')
    });
  }

}
