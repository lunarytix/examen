import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SimpleResponse } from 'src/app/main/objects/simple-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProspectosService {

  private baseUrl:string = environment.base_url;
  private UrlEndpoint:string = "/api/prospectos";
  constructor(private http: HttpClient) { }

  obtenerTodo = ():Observable<SimpleResponse> => {
    return this.http.get(`${this.baseUrl}${this.UrlEndpoint}`,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }

  obtenerProductosSoftRestaurant = ():Observable<SimpleResponse> => {
    return this.http.get(`${this.baseUrl}${this.UrlEndpoint}/softRestaurant/productos`,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }

  obtenerMeserosSoftRestaurant = ():Observable<SimpleResponse> => {
    return this.http.get(`${this.baseUrl}${this.UrlEndpoint}/softRestaurant/mesero`,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }


  obtenerPorFecha = ( datos:{inicial: string, final: string} ):Observable<SimpleResponse> => {
    return this.http.post(`${this.baseUrl}${this.UrlEndpoint}/buscar`,datos,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }

  obtenerId = (id: number):Observable<SimpleResponse> => {
    return this.http.get(`${this.baseUrl}${this.UrlEndpoint}/${id}`,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }

  registrar = (hostess: any):Observable<SimpleResponse> => {
    return this.http.post(`${this.baseUrl}${this.UrlEndpoint}`,hostess,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }

  editar = (hostess: any,id: number):Observable<SimpleResponse> => {
    return this.http.put(`${this.baseUrl}${this.UrlEndpoint}/${id}`,hostess,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }


  deshabilitar = (id: number):Observable<SimpleResponse> => {
    return this.http.delete(`${this.baseUrl}${this.UrlEndpoint}/${id}`,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }


  autorizacion = (id: number):Observable<SimpleResponse> => {
    return this.http.put(`${this.baseUrl}${this.UrlEndpoint}/autorizacion/${id}`,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }

}
