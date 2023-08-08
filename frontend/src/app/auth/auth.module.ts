import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmaterialModule } from '../material/amaterial.module';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth.routing';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    AmaterialModule,
    SharedModule,
  ],
})
export class AuthModule { }
