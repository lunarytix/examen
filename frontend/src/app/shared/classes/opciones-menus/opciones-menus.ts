import { Router } from "@angular/router";
import { HomeService } from "src/app/home/services/home.service";
import { IMenu } from "../../components/sidenav/sidenav.component";


export default class opcionesMenus {

  protected opciones:string[] = [];
  // protected subscripcionOpciones: Subscription | undefined;

  constructor(public homeService: HomeService,public router: Router) {
    this.obtenerOpciones();
  }

  // ngOnDestroy(): void {
  //   this.subscripcionOpciones?.unsubscribe();
  // }

  tieneAcceso = (opcion:string) => {
    return this.opciones.find( e => e === opcion);
  }

  obtenerOpciones = () => {
       this.homeService.menuActual.subscribe(todosMenus => {
        this.opciones =
        todosMenus.map( (menu:IMenu) =>{
          if (menu.route === this.router.url) {
              return menu;
          }
          return menu.hijos?.find( (hijos:IMenu)=> hijos.route === this.router.url );
        })
        .filter(e => e) // Quitar elementos undefinied
        [0]             // convertir array en object ya que deberia aber solo 1
        ?.opciones.toUpperCase().split(",") // convertir string en array
        || [] ;       //si es vacio?
      })

    }

}
