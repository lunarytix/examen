
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageErrorComponent } from './shared/components/page-error/page-error.component';

const routes: Routes = [
  {
    path: 'auth' ,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'precios',
    loadChildren: () => import('./precios/precios.module').then(m => m.PreciosModule)
  },
  {
    path: 'prospectos',
    loadChildren: () => import('./modulos/Components/prospectos/prospectos.module').then(m => m.ProspectosModule)
  },
  {
    path: 'notfound',
    component: PageErrorComponent
  },
  {
    path: '**',
    redirectTo: 'auth/',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
