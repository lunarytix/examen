import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType, ChartTypeRegistry } from 'chart.js';
import { dataSetObj } from '../objetos/dataset';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  @Input("data") data:dataSetObj[] = [];
  @Input("labels") labels:string[] | string = [];
  @Input("leyend") leyend:boolean = true;
  @Input("tipo") tipo:ChartType = 'doughnut' ;// as ChartTypeRegistry;

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  public pieChartLegend = true;
  public pieChartPlugins = [];

  public barChartData: ChartConfiguration['data'] = {
     datasets: []
  };


  constructor() { }

  ngOnInit() {
    //Asignar data enviada desde el componente padre
    this.barChartData.datasets = this.data;
    this.barChartData.labels = this.labels as unknown[];
    this.pieChartLegend = this.leyend;

  }
}
