import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'
  ]
})
export class NavbarComponent implements OnInit {
  @Input('idSideNav') idSideNav!: MatSidenav;
  @Input('home') home!: () => void;
  @Input('logout') logout!: () => void;
  resultado:any;
  readonly VAPID_PUBLIC_KEY = "BNhMpbR8aQx0ixmrdGy40CHNgYtexdXVd6YxL1XOsriKxJG1veuAdwHKoD2ikrTqLryZgVfh3kIpDnuE6s-octU";

   constructor(

    ) {
   }

  ngOnInit(): void {
  }

  toggleSideNav = () => {
    this.idSideNav.toggle()
  }
  


}
