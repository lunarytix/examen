import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmaterialModule } from '../material/amaterial.module';
import { HomeComponent } from './template/home.component';
import { HomeRoutingModule } from './home.routing';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AmaterialModule,
    SharedModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
