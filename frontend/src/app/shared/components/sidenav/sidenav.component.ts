import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/home/services/home.service';


export interface IMenu {
  menu: string,
  icono: string,
  route?: string,
  hijos?: IMenu[],
  moduloId: number,
  opciones: string
}


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: [ './sidenav.component.scss' ]
})

export class SidenavComponent implements OnInit {
   menus: IMenu[] = [];
  opciones: string[] = [];
  private subscripcionMenus: Subscription | undefined;

  constructor(
    private homeService: HomeService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.obtenerMenus();
  }

  ngOnDestroy(): void {
    this.subscripcionMenus?.unsubscribe();
  }

  isActive(hijos:IMenu[]){
    return hijos.find((hijo:IMenu) => hijo.route === this.router.url);
  }

  obtenerMenus = () => {

    this.subscripcionMenus = this.homeService.menuActual.subscribe(
        menuActual => {
          if (this.menus != menuActual) {
            this.menus = menuActual;
          }
        }
      )
    }



}



/* */

/* */
