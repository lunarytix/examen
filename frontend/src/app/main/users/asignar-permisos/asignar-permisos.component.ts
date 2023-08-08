import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { showBasicAlert } from 'src/app/shared/tools/swal-alerts';
import { SimpleResponse } from '../../objects/simple-response';
import { Usuario } from '../../objects/usuario';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-asignar-permisos',
  templateUrl: './asignar-permisos.component.html',
  styleUrls: ['./asignar-permisos.component.scss']
})
export class AsignarPermisosComponent implements OnInit {
  usuario!:Usuario;
  dataSource:any[] = [];
  checklistSelection:SelectionModel<any>[] = [];// = new SelectionModel<any[]>(true /* multiple */);


  constructor(private usuariosServicio: UsersService,
              private dialogRef: MatDialogRef<AsignarPermisosComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Usuario) {
    this.usuario = this.data;
    this.asignacionPermisos();
  }


  ngOnInit(): void {


    // this.checklistSelection.selected({id: '1', item: 'Listar', padreId: 3});
  }


  asignacionPermisos = () => {
    this.usuariosServicio.asignacionPermisos( this.usuario ).subscribe({
      next: (data) => {
          const response:SimpleResponse = data;
          if (response.error){
            showBasicAlert('Ups',response.msg,'error')
          }
          this.dataSource = response.payload;

          // Checked permisos anteriormente asignados
          // this.treeControl.dataNodes = response.payload;
          // this.treeControl.expandAll()
          // this.seleccionarPermisosUsuario();
          /* */
        },
      error: (err) => {
        showBasicAlert('Ups',err.message,'error')
      }
    })
  }

  // deseleccionar de padres a hijos
  // seleccionarPermisosUsuario = () => {
  //   this.dataSource.forEach( item => {
  //     this.treeControl.getDescendants(item).forEach(i => {

  //       if (i.isChecked) {
  //         this.todoItemSelectionToggle(i)
  //       }

  //     })
  //   })
  // }


  asignarPermisos = () => {
    const datos = {
      id: this.usuario?.id!,
      padres: this.checklistSelection.map(padre => {
         return padre.selected.filter( element => element.menuId );
        }),
      opciones: this.checklistSelection.map(opcion => {
        return opcion.selected.filter( element => element.id );
       }).filter(element => element.length > 0),
    };

    if ((datos.opciones.length > 0 || datos.padres.length > 0) && this.usuario) {

      this.usuariosServicio.asignarPermisos( datos ).subscribe({
        next: (data) => {
          const response:SimpleResponse = data;
          if (response.error){
             showBasicAlert('Ups',response.msg,'error')
          }
          this.dialogRef.close(response);
        },
        error: (err) => {
          showBasicAlert('Ups',err.message,'error')
        }
      });

    }


  }



  onNoClick = (): void => {
    this.dialogRef.close();
  }

  verItems = (evento:any,index:number) => {
     this.checklistSelection[index] = evento;
  }
}
