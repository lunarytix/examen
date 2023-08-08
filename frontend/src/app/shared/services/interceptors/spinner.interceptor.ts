import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable, tap } from "rxjs";
import { SpinnerService } from "../spinner.service";
@Injectable({
  providedIn: 'root'
})

export class spinnerInterceptor implements HttpInterceptor{
  constructor(private servicioSpinner: SpinnerService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.servicioSpinner.cargando.getValue()) {
      this.servicioSpinner.mostrar();
    }
    return next.handle(req).pipe(
      finalize( () =>{
        if (this.servicioSpinner.cargando.getValue()) {
          this.servicioSpinner.ocultar()
        }
      })
    );
  }

}
