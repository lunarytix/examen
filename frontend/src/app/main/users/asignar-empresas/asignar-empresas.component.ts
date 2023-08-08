import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { showBasicAlert } from 'src/app/shared/tools/swal-alerts';
import { Empresa } from '../../objects/empresa';
import { SimpleResponse } from '../../objects/simple-response';
import { Usuario } from '../../objects/usuario';
import { CompanysService } from '../../services/companys.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-asignar-empresas',
  templateUrl: './asignar-empresas.component.html',
  styleUrls: ['./asignar-empresas.component.scss']
})
export class AsignarEmpresasComponent implements OnInit {
  asignadas:any[] = [];
  porAsignar:any[] = [];


  constructor(private empresasServicio: CompanysService,
              public dialogRef: MatDialogRef<AsignarEmpresasComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Usuario) {
    this.obtenerEmpresasPorUsuario();

  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  asignarEmpresas = (event: Event) => {
    event.preventDefault();
    if (this.asignadas.length > 0) {
      this.empresasServicio.asignarEmpresasUsuario(this.asignadas,this.data).subscribe({
        next: (result) => {

          const response:SimpleResponse = result;
          if (response.error){
            showBasicAlert('Ups',response.msg,'error')
         }
         this.dialogRef.close(response);
        },
        error: (err) => {
          showBasicAlert('Ups',err.message,'error')
        }
      })
    }
  }

  obtenerEmpresasPorUsuario = () => {
    this.empresasServicio.obtenerEmpresasPorUsuario(this.data).subscribe({
      next: (result) => {
        const response:SimpleResponse = result;
        if (response.error){
          showBasicAlert('Ups',response.msg,'error')
       }
        this.asignadas = response.payload.asignadas;
        this.porAsignar = response.payload.porAsignar.map((item:Empresa) => {
          const estaAsignada = this.asignadas.find( (e:Empresa) => e.id === item.id);
          if (!estaAsignada) {
            return item;
          }else{
            return;
          }
        }).filter((e:any)=>e);
      },
      error: (err) => {
        showBasicAlert('Ups',err.message,'error')
      }
    })
  }

}
