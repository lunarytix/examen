import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieComponent } from './pie/pie.component';
import { NgChartsModule } from 'ng2-charts';
import { BarComponent } from './bar/bar.component';
import { LineComponent } from './line/line.component';
import { ChartGenericaComponent } from './chart-generica/chart-generica.component';
import { AmaterialModule } from '../material/amaterial.module';

@NgModule({
  imports: [
    CommonModule,
    NgChartsModule,
    AmaterialModule
  ],
  declarations: [
    PieComponent,
    BarComponent,
    LineComponent,
    ChartGenericaComponent
  ],
  exports:[
    PieComponent,
    BarComponent,
    LineComponent,
    ChartGenericaComponent
  ]
})
export class GraficasModule { }
