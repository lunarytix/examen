import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/home/services/home.service';
import { SimpleResponse } from 'src/app/main/objects/simple-response';
import opcionesMenus from 'src/app/shared/classes/opciones-menus/opciones-menus';
import { OpcionTable } from 'src/app/shared/objetos/opcion-table';
import { ModalsCustom } from 'src/app/shared/tools/modals-custom';
import { showBasicAlert, showConfirmAlert } from 'src/app/shared/tools/swal-alerts';

import { ProspectosService } from 'src/app/modulos/Services/prospectos.servces';
import { CrearProspectosComponent as ComponentCrear } from '../crear-prospectos/crear-prospectos.component';
import { EditarProspectosComponent  as ComponentEditar} from '../editar-prospectos/editar-prospectos.component';

@Component({
  selector: 'app-listar-prospectos',
  templateUrl: './listar-prospectos.component.html',
  styleUrls: ['./listar-prospectos.component.scss']
})
export class ListarProspectosComponent extends opcionesMenus implements OnInit {

  Titulo = 'Prospectos'
  DTEntrada: any[] = [];
  // nombre
  // apellidoP
  // apellidoM
  // calle
  // colonia
  // numero
  // codigoPostal
  // telefono
  // rfc
  // estado
  columnas: any[] = [
    { nombre: 'nombre', pipe: 'uppercase' },
    { nombre: 'apellidoP', pipe: 'uppercase' },
    { nombre: 'apellidoM', pipe: 'uppercase' },
    { nombre: 'calle', pipe: 'uppercase' },
    { nombre: 'colonia', pipe: 'uppercase' },
    { nombre: 'numero', },
    { nombre: 'codigoPostal', },
    { nombre: 'telefono', },
    { nombre: 'rfc', pipe: 'uppercase' },
    { nombre: 'fecha',pipe:'date',  },
    { nombre: 'autorizacion' ,leyenda : 'autorizacion' , estado:true  },
    { nombre: 'opciones', menu: true },
  ];


  estadosTabla: OpcionTable[] = [
    {
      texto: 'Autrozado',
      icono: 'check',
      color: 'primary',
      condicion: (hostess: any): boolean => {
        return (hostess.autorizacion) ? true : false;
      }
    },
    {
      texto: 'No Autorizado',
      icono: 'close',
      color: 'danger',
      condicion: (hostess: any): boolean => {
        return (!hostess.autorizacion)  ? true : false;
      }
    }
    
  ]
  constructor(
    private modal: ModalsCustom,
    private service: ProspectosService,
    private homeServicio: HomeService,
    private rutas: Router
  ) {
    super(homeServicio, rutas);
    if (this.tieneAcceso('LISTAR')) {
      this.obtenerTodo()
    }
   }

  ngOnInit(): void {
  }

  obtenerTodo = () => {
    this.service.obtenerTodo().subscribe({
      next: (data) => {
        const response: SimpleResponse = data;
        if (response.error) {
          showBasicAlert('Ups', response.msg, 'error')
        } else {
          this.DTEntrada = response.payload;
        }
      },
      error: (err) => {
        showBasicAlert('Ups', err.message, 'error')
      }
    })
  }

  crearComponente = () => {
    this.modal.openFrmDialog(ComponentCrear, {})
      .subscribe((result: SimpleResponse) => {
        if (!result) { return; }

        if (result.error) {
          showBasicAlert('Ups!', result.msg, 'error')
          return;
        } else {
          showBasicAlert('Éxito!', `${this.Titulo} registrado correctamente`, 'success')
          this.obtenerTodo();
        }
      });
  }


  opcionesTabla: OpcionTable[] = [
    {
      texto: `Editar ${this.Titulo}` ,
      icono: "edit",
      condicion: (prospecto: any) => {
        return (this.tieneAcceso('EDITAR') ? true : false) 
      },
      funcion: (prospecto: any) => {
        this.modal.openFrmDialog(ComponentEditar, { prospecto, editable: true })
          .subscribe((result: SimpleResponse) => {
            if (!result) { return; }

            if (result.error) {
              showBasicAlert('Ups!', result.msg, 'error')
              return;
            } else {
              showBasicAlert('Éxito!', `${this.Titulo}  actualizado correctamente`, 'success');
              this.obtenerTodo();
            }
          });
      }
    },
    {
      texto: `Eliminar ${this.Titulo} `,
      icono: "delete",
      condicion: (prospecto: any) => {
        return (this.tieneAcceso('BORRAR') ? true : false) 
      },
      funcion: (prospecto: any) => {
      
                showConfirmAlert(
                  `Baja de ${this.Titulo} `,
                  `Al confirmar, el ${this.Titulo} : <b>${prospecto?.nombre}</b> no podrá ser utilizado.`,
                  'question').then(
                    result => {
                      if (result.isConfirmed) {
                        this.service.deshabilitar(prospecto.id).subscribe({
                          next: (data) => {
                            const response: SimpleResponse = data;
                            if (response.error) {
                              showBasicAlert('Ups', response.msg, 'error')
                            } else {
                              showBasicAlert('Éxito!', `${this.Titulo}  deshabilitado correctamente`, 'success')
                              this.obtenerTodo();
                            }
                          },
                          error: (err) => {
                            const response: SimpleResponse = err.error;
                            showBasicAlert('Ups', response.msg, 'error')
                          }
                        })
                      }
                    }

                  )
              }
    },
    {
      texto: `Autorización  ${this.Titulo} `,
      icono: "delete",
      condicion: (prospecto: any) => {
        return (this.tieneAcceso('EDITAR') ? true : false) 
      },
      funcion: (prospecto: any) => {
      
                showConfirmAlert(
                  `Baja de ${this.Titulo} `,
                  `Al confirmar, el ${this.Titulo} : <b>${prospecto?.nombre}</b> no podrá ser utilizado.`,
                  'question').then(
                    result => {
                      if (result.isConfirmed) {
                        this.service.autorizacion(prospecto.id).subscribe({
                          next: (data) => {
                            const response: SimpleResponse = data;
                            if (response.error) {
                              showBasicAlert('Ups', response.msg, 'error')
                            } else {
                              showBasicAlert('Éxito!', `${this.Titulo}  deshabilitado correctamente`, 'success')
                              this.obtenerTodo();
                            }
                          },
                          error: (err) => {
                            const response: SimpleResponse = err.error;
                            showBasicAlert('Ups', response.msg, 'error')
                          }
                        })
                      }
                    }

                  )
              }
    },
  ]

}

