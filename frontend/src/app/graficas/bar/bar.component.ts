import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { dataSetObj } from '../objetos/dataset';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  @Input("data") data:dataSetObj[] =[{data:[],label:''}];
  @Input("labels") labels:string[] = [];
  @Input("leyend") leyend:boolean = true;

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
     datasets: []
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };


  constructor() { }

  ngOnInit() {
    //Asingar valores grafica
    this.barChartData.labels = this.labels;
    this.barChartData.datasets = this.data;
    this.barChartLegend = this.leyend;

  }

}
