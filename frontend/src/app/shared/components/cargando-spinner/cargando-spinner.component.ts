import { Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-cargando-spinner',
  template: `
  <div class="overlay" *ngIf="cargando | async">
    <div class="loadingio-spinner-dual-ball-z71afuwxf8">
      <div class="ldio-3l52unqqgsc">
        <div></div><div></div><div></div>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./cargando-spinner.component.scss']
})
export class CargandoSpinnerComponent{
  cargando = this.spinnerServicio.cargando;
  constructor(private spinnerServicio:SpinnerService) { }

  ngOnInit() {
  }

}
