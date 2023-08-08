import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { BaseUrlPipe } from './base-url.pipe';
import { TituloPipe } from './titulo.pipe';
import { DynamicPipe } from './dynamic.pipe';



@NgModule({
  declarations: [
    BaseUrlPipe,
    TituloPipe,
    DynamicPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    BaseUrlPipe,
    TituloPipe,
    DynamicPipe
  ],
  providers:[DatePipe,DecimalPipe]
})
export class PipesModule { }
