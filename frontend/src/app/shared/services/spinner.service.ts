import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
cargando = new BehaviorSubject<boolean>(false);

constructor() { }

  mostrar = ():void => {
    this.cargando.next(true);
  }

  ocultar = ():void => {
    this.cargando.next(false);
  }
}
