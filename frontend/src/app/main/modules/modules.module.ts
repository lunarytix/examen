import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListModulesComponent } from './list-modules/list-modules.component';
// import { ModulesRoutingModule } from './modules.routing';
import { AmaterialModule } from 'src/app/material/amaterial.module';
import { ModuleComponent } from './module/module.component';
import { FrmCreateModuleComponent } from './frm-create-module/frm-create-module.component';
import { FrmUpdateModuleComponent } from './frm-update-module/frm-update-module.component';
import { ShowModulesComponent } from './show-modules/show-modules.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [
    ListModulesComponent,
    ModuleComponent,
    FrmCreateModuleComponent,
    FrmUpdateModuleComponent,
    ShowModulesComponent,

  ],
  imports: [
    CommonModule,
    // ModulesRoutingModule,
    AmaterialModule,
    RouterModule,
    PipesModule
  ]
})
export class ModulesModule { }
