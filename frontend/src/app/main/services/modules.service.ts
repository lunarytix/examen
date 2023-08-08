import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Modulo } from '../objects/modulo';
import { SimpleResponse } from '../objects/simple-response';
import { Usuario } from '../objects/usuario';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {
  private baseUrl = environment.base_url;

  constructor(
    private http: HttpClient
  ) { }

  getModules = ():Observable<SimpleResponse> => {
    return this.http.get(`${this.baseUrl}/api/modules`,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }

  getModuleById = (modulo:Modulo):Observable<SimpleResponse> => {
    const url = `${this.baseUrl}/api/modules/${modulo.id}`;
    return this.http.get(url,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }

  saveModule = (modulo:Modulo):Observable<SimpleResponse> => {
    const url = `${this.baseUrl}/api/modules`;
    return this.http.post(url,modulo,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }

  updateModule = (modulo:Modulo):Observable<SimpleResponse> => {
    const url = `${this.baseUrl}/api/modules/${modulo.id}`;
    return this.http.put(url,modulo,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }


  deleteModule = (modulo:Modulo):Observable<SimpleResponse> => {
    const url = `${this.baseUrl}/api/modules/${modulo.id}`;
    return this.http.delete(url,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }

  getModulesByUser = ():Observable<SimpleResponse> => {
    const url = `${this.baseUrl}/api/modules/usuario`;
    return this.http.get(url,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }

}
