import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalsCustom } from 'src/app/shared/tools/modals-custom';
import { showBasicAlert, showConfirmAlert } from 'src/app/shared/tools/swal-alerts';
import { Empresa } from '../../objects/empresa';
import { SimpleResponse } from '../../objects/simple-response';
import { CompanysService } from '../../services/companys.service';
import { FrmCreateCompanyComponent } from '../frm-create-company/frm-create-company.component';
import { FrmUpdateCompanyComponent } from '../frm-update-company/frm-update-company.component';

@Component({
  selector: 'app-list-companys',
  templateUrl: './list-companys.component.html',
  styles: [`.table-container{
    position: relative;
    min-height: 200px;
    max-height: 400px;
    overflow: auto;
  }`]
})
export class ListCompanysComponent implements OnInit {
  displayedColumns: string[] = ["ID","Nombre","Empresa","Opción"];
  // dataSource:Empresa[] = [];
  dataSource: MatTableDataSource<Empresa> = new MatTableDataSource<Empresa>();
  @ViewChild('tableSort') tableSort = new MatSort();

  constructor(
    private modal:ModalsCustom,
    private companysService:CompanysService,
  ) {
    this.getCompanys();
   }

  ngOnInit(): void {
    // this.homeService.asignarModuloActual({ id: 1 });
  }

  getCompanys = () => {
    this.companysService.getEmpresasPublic().subscribe({
      next: (data) => {
        const response:SimpleResponse = data;

        const res = response.payload;
        /*.map((element:Empresa) => {

          return{
              id: element.id,
              razonSocial: capitalizeFirstLetter(`${element.razonSocial || ''}`),
              nombreComercial: capitalizeFirstLetter(element.nombreComercial || ''),
              opcion: ''
            }
        });*/

        // this.dataSource = res;
        this.dataSource = new MatTableDataSource<Empresa>(res);
        this.dataSource.sort = this.tableSort;
      },
      error: (err) => {
        showBasicAlert('Ups!',err.message,'error')
      }
    })
  }


  createCompany =  () => {
    this.modal.openFrmDialog(FrmCreateCompanyComponent)
    .subscribe((result:SimpleResponse) =>{
        if (!result){return;}

        if (result.error) {
          showBasicAlert('Ups!',result.msg,'error')
          return;
        }

        showBasicAlert('Exito!','Empresa registrada correctamente','success')
        this.getCompanys();
    });
  }

  updateCompany = (empresa:Empresa) => {
    this.modal.openFrmDialog(FrmUpdateCompanyComponent,empresa)
    .subscribe((result:SimpleResponse) =>{
        if (!result){return;}

        if (result.error) {
          showBasicAlert('Ups!',result.msg,'error')
          return;
        }

        showBasicAlert('Exito!','Empresa actualizada correctamente','success')
        this.getCompanys();
    });

  }


  deleteCompany = (empresa:Empresa) => {

    showConfirmAlert(
      'Baja de empresa',
      `¿Al confirmar, la empresa: <b>${empresa.nombreComercial}</b> no podrá utilizarse?`,
      'question').then(
      result => {
        if (result.isConfirmed) {
          this.companysService.deleteCompany(empresa).subscribe({
            next: (data) => {
              const response:SimpleResponse = data;
              if (response.error){
                showBasicAlert('Ups',response.msg,'error')
              }

              showBasicAlert('Exito!','Empresa dado de baja correctamente.','success');
              this.getCompanys();
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
