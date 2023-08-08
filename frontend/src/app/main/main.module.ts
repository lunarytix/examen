import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../shared/shared.module';
import { CompanysModule } from './companys/companys.module';
import { UsersModule } from './users/users.module';
import { ModulesModule } from './modules/modules.module';
import { MainRoutingModule } from './main.routing';
import { AmaterialModule } from '../material/amaterial.module';
import { HomeModule } from '../home/home.module';





@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    UsersModule,
    CompanysModule,
    ModulesModule,
    MainRoutingModule,
    AmaterialModule,
    HomeModule,
    // PipesModule
  ]
})
export class MainModule { }
