import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , tap} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empresa } from '../objects/empresa';
import { SimpleResponse } from '../objects/simple-response';
import { Usuario } from '../objects/usuario';

@Injectable({
  providedIn: 'root'
})
export class CompanysService {

  private baseUrl:string = environment.base_url;
  constructor(private http: HttpClient) { }

  getEmpresasPublic = ():Observable<SimpleResponse> => {
    return this.http.get(`${this.baseUrl}/api/companys/public`,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }

  getCompanys = ():Observable<SimpleResponse> => {
    return this.http.get(`${this.baseUrl}/api/companys`,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }

  getCompanyById = (empresa: Empresa):Observable<SimpleResponse> => {
    return this.http.get(`${this.baseUrl}/api/companys/${empresa.id}`,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }

  deleteCompany = (empresa:Empresa):Observable<SimpleResponse> => {
    const url = `${this.baseUrl}/api/companys/${empresa.id}`;
    return this.http.delete(url,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }

  saveCompany = (empresa:Empresa):Observable<SimpleResponse> => {
    const url = `${this.baseUrl}/api/companys`;
    return this.http.post(url,empresa,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }


  updateCompany = (empresa:Empresa):Observable<SimpleResponse> => {
    const url = `${this.baseUrl}/api/companys/${empresa.id}`;
    return this.http.put(url,empresa,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }

  obtenerEmpresasPorUsuario = (usuario: Usuario):Observable<SimpleResponse> => {
    return this.http.get(`${this.baseUrl}/api/companys/obtenerEmpresasPorUsuarioId/${usuario.id}`,{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }


  asignarEmpresasUsuario = (empresas: Empresa[],usuario:Usuario):Observable<SimpleResponse> => {
    return this.http.post(`${this.baseUrl}/api/companys/asignarEmpresasUsuario`,{
      empresas,
      id: usuario.id
    },{
      headers:{
        'x-auth': localStorage.getItem('token') || ''
      }
    }).pipe(
      tap( (resp:any) => resp)
    )
  }


}
