import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Usuario } from 'src/app/main/objects/usuario';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  usuario:Usuario= JSON.parse( localStorage.getItem("user") ||'');
  @Input('idSideNav') idSideNav: MatSidenav | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
