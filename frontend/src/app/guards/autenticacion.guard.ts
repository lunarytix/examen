import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
 import { AuthService } from "../auth/services/auth.service";
import { HomeService } from "../home/services/home.service";

@Injectable({
  providedIn: 'root'
})

export class AutenticacionGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private homeService:HomeService,
    private router: Router
  ) { }

    //Este guards funciona con promesas para anidar guards,
    // dependiendo si cumplen con las validaciones
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const auth = await this.valdarToken(route, state);
      if (auth) {
        const menu = await this.obtenerMenu(route, state);
        if (!menu) {
            this.router.navigateByUrl("/notfound");
        }
        return menu;
      } else {
        this.router.navigateByUrl("/auth/login");
        localStorage.clear();
        return false;
      }
  }

  async obtenerMenu(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>{
      if (state.url === '/notfound') {
        return new Promise<boolean>((resolve,reject)=>resolve(false));
      }
      return  new Promise<boolean>((resolve, reject) => {
        this.homeService.getMenu( state.url ).subscribe({
          next: resOK => {
            resolve(resOK);
          },
          error: err => {
            resolve(false);
          }
        })
      });
  }

  //Este se usa para retornar una promesa verdadera o falsa depende si esta logeado o no,
  // este metodo NO redirecciona
  async valdarToken(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      this.authService.validarToken().subscribe({
        // call a service to verify user...
        next: resOK => {
             resolve(resOK);
        },
        error: err => {
           resolve(false); // return the fail result of the service.
        }
      });

  })
}

}
