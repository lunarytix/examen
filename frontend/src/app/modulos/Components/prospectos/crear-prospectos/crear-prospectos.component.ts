import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { SimpleResponse } from 'src/app/main/objects/simple-response';
import { ProspectosService } from 'src/app/modulos/Services/prospectos.servces';

@Component({
  selector: 'app-crear-prospectos',
  templateUrl: './crear-prospectos.component.html',
  styleUrls: ['./crear-prospectos.component.scss']
})
export class CrearProspectosComponent implements OnInit {

  formulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required]],
    apellidoP: [,[]] ,
    apellidoM: [,[]] ,
    calle: [,[]] ,
    colonia: [,[]] ,
    numero: [,[]] ,
    codigoPostal: [,[]] ,
    telefono: [,[]] ,
    rfc: [,[]] ,
    // estado: [,[]] ,
    // fecha: [,[]] ,
    // porcentaje: [, [Validators.required,Validators.max(99)]],
    // tipo: [, [Validators.required]],
    // idgrupo: [, [Validators.required]],
    // rfc: [, [Validators.required]]
  });

  constructor(
    private dialogRef: MatDialogRef<CrearProspectosComponent>,
    private fb: FormBuilder,
    private service: ProspectosService 
  ) { }

  ngOnInit(): void {
  }

  onNoClick = (): void => {
    this.dialogRef.close();
  }

  isValidform = (): boolean => {
    return !this.formulario.valid;
  }

  isValidField = (campo: string) => {
    return this.formulario.controls[campo].errors &&
      this.formulario.controls[campo].touched;
  }

  getMessageError = (campo: string = '') => {

    // if (campo === 'numeroConsultorio') {
    //   if (this.formulario.get('numeroConsultorio')!.hasError('required')) {
    //     return 'Coloque número de consultorio';
    //   }
    // }

    // if (campo === 'empresaId') {
    //   if (this.formulario.get('empresaId')!.hasError('required')) {
    //     return 'Seleccione una empresa.';
    //   }
    // }

    // if (campo === 'descripcion') {
    //   if (this.formulario.get('descripcion')!.hasError('required')) {
    //     return 'Coloque una descripción.';
    //   }
    // }

    // if (campo === 'recepcionId') {
    //   if (this.formulario.get('recepcionId')!.hasError('required')) {
    //     return 'Seleccione una recepcion.';
    //   }
    // }

    // if (campo === 'prefijo') {
    //   if (this.formulario.get('recepcionId')!.hasError('required')) {
    //     return 'Coloque un prefijo';
    //   }
    // }

    return 'Es requerido'
  }


  registrarComponente = () => {
    if (this.formulario.valid) {
      const fechaHoy = moment(new Date()).format('YYYY-MM-DD 00:00:00')
      const consultorio = this.formulario.value;
      
    
      this.service.registrar(consultorio).subscribe({
        next: (data) => {
          const response: SimpleResponse = data;
          if (response.error) {
            showBasicAlert('Ups', response.msg, 'error')
            this.dialogRef.close(response);
          }
          
          
            this.dialogRef.close(response);
          


        },
        error: (err) => {
          if (err.error.payload !== undefined) {
            if (Array.isArray(err.error.payload)) {
              showArrayAlert('Ups', err.error.payload.errors, 'error')
            } else {
              showBasicAlert('Ups', err.error.msg, 'error')
            }
            return;
          }
          showBasicAlert('Ups', err.message, 'error')
        }
      })
    }

  }


}
function showBasicAlert(arg0: string, msg: any, arg2: string) {
  throw new Error('Function not implemented.');
}

function showArrayAlert(arg0: string, errors: any, arg2: string) {
  throw new Error('Function not implemented.');
}

