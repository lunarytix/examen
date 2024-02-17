import { Routes, RouterModule } from '@angular/router';
import { AutenticacionGuard } from 'src/app/guards/autenticacion.guard';
import { HomeComponent } from 'src/app/home/template/home.component';
import { ListarProspectosComponent } from './listar-prospectos/listar-prospectos.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AutenticacionGuard],
    children: [
      {
        path: 'prospectos',
        component: ListarProspectosComponent
      },
    //   {
    //     path: '**',
    //     redirectTo: '/notfound',
    //     pathMatch: 'full'
    //   }
    ]
  }
];

export const ProspectosRoutes = RouterModule.forChild(routes);
