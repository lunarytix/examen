import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable , of, pipe, tap} from "rxjs";
import { AuthService } from "../auth/services/auth.service";
import { HomeService } from "../home/services/home.service";
import { SimpleResponse } from "../main/objects/simple-response";
import { showBasicAlert } from "../shared/tools/swal-alerts";

@Injectable({
  providedIn: 'root'
})

export class MenusGuards implements CanActivate  {

  constructor(private authService:AuthService,
    private homeService:HomeService,
    private router: Router){

}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){


      if (state.url === '/notfound') {
        return of(true)
      }

      return this.homeService.getMenu( state.url ).pipe(
        tap(isAuth => //isAuth
          {
            if (!isAuth) {
              this.router.navigateByUrl("/notfound");
            }
          }
        )
      );


  }

  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean> | Promise<boolean | UrlTree> | boolean {
  //     console.log("entre guard CANLOAD");
  //      return this.authService.validarToken().pipe(
  //       tap(isAuth => {
  //         if(!isAuth)
  //           this.router.navigateByUrl("/auth/login");
  //       })
  //     );
  // }
}
