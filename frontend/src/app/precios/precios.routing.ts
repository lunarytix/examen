
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaPreciosComponent } from './tabla-precios/tabla-precios.component';
import { HomeComponent } from '../home/template/home.component';
import { AutenticacionGuard } from '../guards/autenticacion.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AutenticacionGuard],
    children: [
      {
        path: '',
        component: TablaPreciosComponent
      },
      {
        path: '**',
        redirectTo: '/notfound',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PreciosRoutingModule { }
