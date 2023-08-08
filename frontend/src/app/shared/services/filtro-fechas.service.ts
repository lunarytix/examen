import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InputBusqueda } from '../objetos/inputBusqueda';
 
@Injectable({
  providedIn: 'root'
})
export class FiltroFechasService {
  // Objeto formulario
  private formularioSub: BehaviorSubject<InputBusqueda[]> = new BehaviorSubject<InputBusqueda[]>([]);
  public readonly forumulario: Observable<InputBusqueda[]> = this.formularioSub.asObservable();

  asignarFormulario(form: InputBusqueda[]): void  {
      this.formularioSub.next(form);
  }

  remplazarValorFormulario(form: InputBusqueda[]): void  {
    let frmActual:InputBusqueda[] = [];
    this.forumulario.subscribe((res: InputBusqueda[])=>{
      frmActual = res.map((item:InputBusqueda)=> item );
     });

     form.forEach((item:InputBusqueda) => {
      const buscarindex = frmActual.findIndex(e => e.nombre === item.nombre);
      frmActual[buscarindex] = item;
    });

    this.formularioSub.next(frmActual)

  }

  constructor() { }
}
