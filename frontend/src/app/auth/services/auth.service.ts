import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../main/objects/usuario';
import { tap, map, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.base_url;

  constructor(
    private http: HttpClient,
    // private oAuthService: OAuthService
    ) { }

  login = (usuario: Usuario): Observable<any> => {
    const url = `${this.baseUrl}/api/auth/login`;

    return this.http.post(url, usuario).pipe(
            tap( (res:any) => {
              if(res.msg)
                localStorage.setItem("token",res.msg);
                localStorage.setItem("user",JSON.stringify(res.payload));
            })
    );

  }

  loginGoogle = (usuario: {token: string, usuario: Usuario}): Observable<any> => {
    const url = `${this.baseUrl}/api/auth/loginGoogle`;

    return this.http.post(url, usuario).pipe(
            tap( (res:any) => {
              if(res.msg)
                localStorage.setItem("token",res.msg);
                localStorage.setItem("user",JSON.stringify(res.payload));
            })
    );

  }


  registroUsuario = (usuario: Usuario): Observable<any> => {
    const url = `${this.baseUrl}/api/auth/signup`;

    return this.http.post(url, usuario).pipe(
            tap( (res:any) => {
              // if(res.msg)
              //   localStorage.setItem("token",res.msg);
              //   localStorage.setItem("user",JSON.stringify(res.payload));
            })
    );

  }

  validarToken = (): Observable<boolean> => {
    const url = `${this.baseUrl}/api/auth/renewToken`;
    return this.http.get(url,{
      headers: {
        'x-auth': localStorage.getItem("token") || ''
      }
    }).pipe(
            tap( (res:any) => {
              if(res.msg)
                localStorage.setItem("token",res.msg);
            }),
            map(resp => true),
            catchError(error => of(false)));
  }


  logout = () => {
    localStorage.clear();
  }

  

}
