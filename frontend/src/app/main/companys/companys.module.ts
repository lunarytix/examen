import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCompanysComponent } from './list-companys/list-companys.component';
import { AmaterialModule } from 'src/app/material/amaterial.module';
import { FrmCreateCompanyComponent } from './frm-create-company/frm-create-company.component';
import { FrmUpdateCompanyComponent } from './frm-update-company/frm-update-company.component';



@NgModule({
  declarations: [
    ListCompanysComponent,
    FrmCreateCompanyComponent,
    FrmUpdateCompanyComponent
  ],
  imports: [
    CommonModule,
    // CompanysRoutingModule,
    AmaterialModule
  ]
})
export class CompanysModule { }
