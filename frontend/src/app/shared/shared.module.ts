import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageErrorComponent } from './components/page-error/page-error.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AmaterialModule } from '../material/amaterial.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { CargandoSpinnerComponent } from './components/cargando-spinner/cargando-spinner.component';
import { TablaGenericaComponent } from './components/tabla-generica/tabla-generica.component';
import { FiltrosFechasComponent } from './components/filtros-fechas/filtros-fechas.component';
import { Select2GenericoComponent } from './components/select2-generico/select2-generico.component';
import { PipesModule } from '../pipes/pipes.module';
import { DatetimePickerComponent } from './components/datetime-picker/datetime-picker.component';


 @NgModule({
  declarations: [
    PageErrorComponent,
    NavbarComponent,
    SidenavComponent,
    FooterComponent,
    AvatarComponent,
    CargandoSpinnerComponent,
    TablaGenericaComponent,
    FiltrosFechasComponent,
    Select2GenericoComponent,
    DatetimePickerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AmaterialModule,
    //
    PipesModule

  ],
  exports:[
    SidenavComponent,
    NavbarComponent,
    FooterComponent,
    AvatarComponent,
    CargandoSpinnerComponent,
    TablaGenericaComponent,
    FiltrosFechasComponent,
    Select2GenericoComponent,
    DatetimePickerComponent
  ],

})


export class SharedModule { }
