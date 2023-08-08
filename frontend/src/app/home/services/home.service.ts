import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable , of, tap} from 'rxjs';
import { Modulo } from 'src/app/main/objects/modulo';
import { SimpleResponse } from 'src/app/main/objects/simple-response';
import { IMenu } from 'src/app/shared/components/sidenav/sidenav.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  // Array de menus por modulo
  private menuActualSub: BehaviorSubject<IMenu[]> = new BehaviorSubject<IMenu[]>([]);
  public readonly menuActual: Observable<IMenu[]> = this.menuActualSub.asObservable();

  // Object de opciones por menu
  // private opcionesActualesSub: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  // public readonly opcionesActuales: Observable<string[]> = this.opcionesActualesSub.asObservable();

  asignarMenuActual(menu: IMenu[]): void  {
      this.menuActualSub.next(menu);
  }

  // asignarOpcionesActuales(opciones: string[]): void  {
  //   this.opcionesActualesSub.next(opciones);
  // }



  private baseUrl = environment.base_url;

  constructor(private http: HttpClient) { }

  getMenuByUser = ( modulo:Modulo ):Observable<SimpleResponse> => {

    const url = `${this.baseUrl}/api/rolesopciones/${modulo.id}`;
    return this.http.get(url,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => {
        // localStorage.setItem('menu',JSON.stringify(resp.payload))
        resp
      })
    )
  }

  // validarToken = (): Observable<boolean> => {
  //   const url = `${this.baseUrl}/api/auth/renewToken`;
  //   return this.http.get(url,{
  //     headers: {
  //       'x-auth': localStorage.getItem("token") || ''
  //     }
  //   }).pipe(
  //           tap( (res:any) => {
  //             if(res.msg)
  //               localStorage.setItem("token",res.msg);
  //           }),
  //           map(resp => true),
  //           catchError(error => of(false)));
  // }

  getMenu = ( ruta:string ):Observable<boolean> => {

    const url = `${this.baseUrl}/api/rolesopciones/obtenerMenu`;
    return this.http.post(url,{ruta},{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => {
        if (resp.payload) {
          this.asignarMenuActual(resp.payload.menus);
          // this.asignarOpcionesActuales(['A','B']);
        }
      }),
      map(resp =>true),
      catchError( error => of(false))
    )
  }

  // getMenu = ( ruta:string ):Observable<SimpleResponse> => {

  //   const url = `${this.baseUrl}/api/rolesopciones/obtenerMenu`;
  //   return this.http.post(url,{ruta},{
  //     headers:{
  //       'x-auth': localStorage.getItem('token') || ''
  //     }
  //   }).pipe(
  //     tap( (resp:any) => {
  //       localStorage.setItem('menu',JSON.stringify(resp.payload))
  //       resp
  //     })
  //   )
  // }

}
