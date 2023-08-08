import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartComponentLike, ChartConfiguration, ChartOptions, ChartType, ChartTypeRegistry } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { dataSetObj } from '../objetos/dataset';

@Component({
  selector: 'app-chart-generica',
  templateUrl: './chart-generica.component.html',
  styleUrls: ['./chart-generica.component.scss']
})
export class ChartGenericaComponent implements OnChanges{
  @Input("datos") datos:dataSetObj[] = [];
  @Input("labels") labels:string[] | string = [];
  @Input("leyend") leyend:boolean = true;
  @Input("tipo") tipo:ChartType = 'doughnut' ;// as ChartTypeRegistry;
  @Input('encabezado') encabezado:string = "";
  @Input('titulo') titulo:string = "";


  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true
  };

  public pieChartLegend = true;
  public chartPlugins:any = {

  };

  public barChartData: ChartConfiguration['data'] = {
     datasets: []
  };

  constructor() {

  }
  //Cuando cambia la informacion @Output(datos) se actualiza la grafica
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['datos']) {
      const valores = changes?.['datos'].currentValue;
      this.barChartData.datasets = valores;
    }

    if (changes?.['labels']) {
      const valores = changes?.['labels'].currentValue;
      this.barChartData.labels = valores as unknown[];
    }

    if (changes?.['datos'] || changes?.['labels']) {
      this.chart?.update()
    }

    // Titulo de la grafica (Usuarlemnte para poner el total de la grafica)
    if (changes?.['titulo']) {
      const valores = changes?.['titulo'].currentValue;
      this.pieChartOptions.plugins = {
        title:{
          display: true,
          text: valores,
          align: 'end',
           font: {
            size: 16
          },
          padding: {
            bottom: 20
          }
        }
      };
      this.chart?.render()
    }


  }

  ngOnInit() {
    //Asignar data enviada desde el componente padre
    this.barChartData.datasets = this.datos;
    this.barChartData.labels = this.labels as unknown[];
    this.pieChartLegend = this.leyend;


  }


}
