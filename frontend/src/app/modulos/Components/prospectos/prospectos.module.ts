import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProspectosRoutes } from './prospectos.routing';
import { FormBuilder, FormControl } from '@angular/forms';

import { ListarProspectosComponent } from './listar-prospectos/listar-prospectos.component';
import { EditarProspectosComponent } from './editar-prospectos/editar-prospectos.component';
import { CrearProspectosComponent } from './crear-prospectos/crear-prospectos.component';
import { AmaterialModule } from 'src/app/material/amaterial.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    ProspectosRoutes,
    AmaterialModule,
    SharedModule,
    ProspectosRoutes,

  ],
  declarations: [  
    ListarProspectosComponent, 
    EditarProspectosComponent, 
    CrearProspectosComponent
  
  ]
    ,
    providers: [
      FormBuilder,
      FormControl,
    ]
})
export class ProspectosModule { }
