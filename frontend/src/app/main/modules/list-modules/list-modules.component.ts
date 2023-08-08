import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HomeService } from 'src/app/home/services/home.service';
import { ModalsCustom } from 'src/app/shared/tools/modals-custom';
import { capitalizeFirstLetter } from 'src/app/shared/tools/string-tools';
import { showBasicAlert, showConfirmAlert } from 'src/app/shared/tools/swal-alerts';
import { Empresa } from '../../objects/empresa';
import { Modulo } from '../../objects/modulo';
import { SimpleResponse } from '../../objects/simple-response';
import { ModulesService } from '../../services/modules.service';
import { FrmCreateModuleComponent } from '../frm-create-module/frm-create-module.component';
import { FrmUpdateModuleComponent } from '../frm-update-module/frm-update-module.component';

@Component({
  selector: 'app-list-modules',
  templateUrl: './list-modules.component.html',
  styles: [`.table-container{
    position: relative;
    min-height: 200px;
    max-height: 400px;
    overflow: auto;
  }`]
})
export class ListModulesComponent implements OnInit {
  displayedColumns: string[] = ["ID","Nombre","Opción"];
  // dataSource:Empresa[] = [];
  dataSource: MatTableDataSource<Modulo> = new MatTableDataSource<Modulo>();
  @ViewChild('tableSort') tableSort = new MatSort();

  constructor(
    private modal:ModalsCustom,
    private modulesService:ModulesService
  ) {
    this.getModules();

   }

  ngOnInit(): void {
    // this.homeService.asignarModuloActual({ id: 1 });

  }

  getModules = () => {
    this.modulesService.getModules().subscribe({
      next: (data) => {
        const response:SimpleResponse = data;
        const res = response.payload;/*.map((element:Modulo) => {
          return{
              id: element.id,
              nombre: capitalizeFirstLetter(`${element.nombre || ''}`),
              opcion: ''
            }
        });*/

        // this.dataSource = res;
        this.dataSource = new MatTableDataSource<Modulo>(res);
        this.dataSource.sort = this.tableSort;
      },
      error: (err) => {
        showBasicAlert('Ups!',err.message,'error')
      }
    })
  }


  createModule =  () => {
    this.modal.openFrmDialog(FrmCreateModuleComponent)
    .subscribe((result:SimpleResponse) =>{
        if (!result){return;}

        if (result.error) {
          showBasicAlert('Ups!',result.msg,'error')
          return;
        }

        showBasicAlert('Exito!','Modulo registrado correctamente','success')
        this.getModules();
    });
  }

  updateModule = (modulo:Modulo) => {
    this.modal.openFrmDialog(FrmUpdateModuleComponent,modulo)
    .subscribe((result:SimpleResponse) =>{
        if (!result){return;}

        if (result.error) {
          showBasicAlert('Ups!',result.msg,'error')
          return;
        }

        showBasicAlert('Exito!','Modulo actualizada correctamente','success')
        this.getModules();
    });

  }


  deleteModule = (modulo:Modulo) => {

    showConfirmAlert(
      'Baja de modulo',
      `¿Al confirmar, el modulo: <b>${modulo.nombre}</b> no podrá utilizarse?`,
      'question').then(
      result => {
        if (result.isConfirmed) {
          this.modulesService.deleteModule(modulo).subscribe({
            next: (data) => {
              const response:SimpleResponse = data;
              if (response.error){
                showBasicAlert('Ups',response.msg,'error')
              }

              showBasicAlert('Exito!','Modulo dado de baja correctamente.','success');
              this.getModules();
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



}
