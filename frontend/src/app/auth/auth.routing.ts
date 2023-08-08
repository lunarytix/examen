
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { LoginComponent } from './login/login.component';

// const routes: Routes = [
//   { path: 'login', component: LoginComponent}
// ];
const routes: Routes = [
  {
    path: '',
    canActivate:[AuthGuard],
    children:[
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path:'signup',
        component: LoginComponent
      },
      {
        path:'**',
        redirectTo: 'login'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
