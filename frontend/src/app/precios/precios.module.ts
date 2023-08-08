import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaPreciosComponent } from './tabla-precios/tabla-precios.component';
import { PreciosRoutingModule } from './precios.routing';
import { AmaterialModule } from '../material/amaterial.module';



@NgModule({
  declarations: [
    TablaPreciosComponent
  ],
  imports: [
    CommonModule,
    PreciosRoutingModule,
    AmaterialModule
  ]
})
export class PreciosModule { }
