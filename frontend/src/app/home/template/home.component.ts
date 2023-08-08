import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/main/objects/usuario';
import {MediaChange, MediaObserver} from "@angular/flex-layout";
import { HomeService } from '../services/home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  usuario:Usuario= JSON.parse( localStorage.getItem("user") ||'');

  mobileQuery!: MediaQueryList;
  mode: any = 'side';
  opened: boolean = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private media: MediaObserver
   ) {

    this.media.asObservable().subscribe((mediaChange:any) => {
      this.mode = this.getMode(mediaChange);
      this.opened = this.getOpened(mediaChange);
    });


   }


  ngOnInit(): void {
    // if (!localStorage.getItem('modulo') || (localStorage.getItem('moduloAnterior') !== localStorage.getItem('modulo')) ) {
      // console.log("estoy registrando");
      // let module = 0;
      // this.homeService.moduloActual.subscribe(currentModule => {
      //   module = currentModule.id || 1;
      // })
      // this.homeService.asignarModuloActual({ id: module });

  }


  logout = () => {
    this.authService.logout();
    this.router.navigateByUrl("/auth/login");
  }

  home = () => {
    // localStorage.setItem('modulo','1');
    // this.homeService.asignarModuloActual({ id: 1 });
    this.router.navigateByUrl("/main/modules/show");
  }

  private getMode(mediaChange: MediaChange): string {
    if (this.media.isActive('gt-sm')) {
      return 'side';
    } else {
      // return 'over';
      return 'push';
    }
  }

  private getOpened(mediaChange: MediaChange): boolean {
    if (this.media.isActive('gt-sm')) {
      return true;
    } else {
      return false;
    }
  }



}
