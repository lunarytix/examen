import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SimpleResponse } from '../objects/simple-response';
import { Usuario } from '../objects/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = environment.base_url;

  constructor(private http: HttpClient) { }

  getUsers = ():Observable<SimpleResponse> => {
    const url = `${this.baseUrl}/api/users`;
    return this.http.get(url,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }


  getUserById = (usuario:Usuario):Observable<SimpleResponse> => {
    const url = `${this.baseUrl}/api/users/${usuario.id}`;
    return this.http.get(url,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }

  saveUser = (usuario:Usuario):Observable<SimpleResponse> => {
    const url = `${this.baseUrl}/api/users`;
    return this.http.post(url,usuario,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }


  updateUser = (usuario:Usuario):Observable<SimpleResponse> => {
    const url = `${this.baseUrl}/api/users/${usuario.id}`;
    return this.http.put(url,usuario,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }

  updatePassword = (usuario:Usuario):Observable<SimpleResponse> => {
    const url = `${this.baseUrl}/api/users/${usuario.id}`;
    return this.http.patch(url,usuario,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }

  deleteUser = (usuario:Usuario):Observable<SimpleResponse> => {
    const url = `${this.baseUrl}/api/users/${usuario.id}`;
    return this.http.delete(url,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }

  asignacionPermisos = ( usuario: Usuario ):Observable<SimpleResponse> => {

    const url = `${this.baseUrl}/api/rolesopciones/obtenerTodasOpcionesPorUsuario/${usuario.id}`;
    return this.http.get(url,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )

  }

  asignarPermisos = ( datos: { id:number , opciones: any[],padres: any[] } ):Observable<SimpleResponse> => {

    const url = `${this.baseUrl}/api/rolesopciones/asignarPermisos`;
    return this.http.post(url,datos,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )

  }


}
