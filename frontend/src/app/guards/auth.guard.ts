import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService,
              private router: Router){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    if (localStorage.getItem("token")){
      this.router.navigateByUrl("/main/modules/show");
      return false;
    }
    return true;
  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot){
  //     return this.authService.validarToken().pipe(
  //       tap(isAuth => {
  //         if(!isAuth)
  //           this.router.navigateByUrl("/auth/login");
  //       })
  //     );
  // }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean | UrlTree> | boolean {
      return this.authService.validarToken().pipe(
        tap(isAuth => {
          if(!isAuth)
            this.router.navigateByUrl("/auth/login");
        })
      );
  }

}
