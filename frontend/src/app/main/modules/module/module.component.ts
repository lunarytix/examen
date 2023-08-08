import { Component, Input, OnInit } from '@angular/core';
import { HomeService } from 'src/app/home/services/home.service';
import { Modulo } from '../../objects/modulo';

@Component({
  selector: 'app-modules',
  templateUrl: './module.component.html',
  styleUrls: [ './modulo.component.scss' ]
})
export class ModuleComponent implements OnInit {
  peticion:boolean = false;

  @Input() modulo:Modulo = {id: 0} ;
  constructor( private homeService: HomeService) {

  }

  ngOnInit(): void {
    // alert("holas");
    // console.log(this.modulo);
  }

  // asignarModulo = () => {
  //   this.homeService.asignarModuloActual( this.modulo);
  //   console.log(this.modulo);
  // }

}
