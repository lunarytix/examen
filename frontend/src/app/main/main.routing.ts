
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacionGuard } from '../guards/autenticacion.guard';
import { HomeComponent } from '../home/template/home.component';
import { ListCompanysComponent } from './companys/list-companys/list-companys.component';
import { ListModulesComponent } from './modules/list-modules/list-modules.component';
import { ShowModulesComponent } from './modules/show-modules/show-modules.component';
import { ListUsersComponent } from './users/list-users/list-users.component';

const routes: Routes = [
  {
    // canActivate: [AuthGuard, MenusGuards],
    canActivate: [AutenticacionGuard],
    path: 'companys',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ListCompanysComponent
      },
      {
        path: '**',
        component: ListCompanysComponent
      }
    ]
  },
  {
    path: 'modules',
    // canActivate: [AuthGuard, MenusGuards],
    canActivate: [AutenticacionGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ListModulesComponent
      },
      {
        path: 'show',
        component: ShowModulesComponent
      },
      {
        path: '**',
        component: ShowModulesComponent
      }
    ]
  },
  {
    path: 'users',
    // canActivate: [AuthGuard, MenusGuards],
    // canLoad: [AuthGuard],
    canActivate: [AutenticacionGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ListUsersComponent
      },
      {
        path: '**',
        component: ListUsersComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/notfound',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
