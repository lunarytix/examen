import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SimpleResponse } from 'src/app/main/objects/simple-response';
import { showBasicAlert, showArrayAlert } from 'src/app/shared/tools/swal-alerts';

import { ProspectosService } from 'src/app/modulos/Services/prospectos.servces';

@Component({
  selector: 'app-editar-prospectos',
  templateUrl: './editar-prospectos.component.html',
  styleUrls: ['./editar-prospectos.component.scss']
})
export class EditarProspectosComponent implements OnInit {
  
  Titulo = 'Productos'
  DTEntrada: any = {};

 
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditarProspectosComponent>,
    private fb: FormBuilder,
    private Services: ProspectosService 
  ) {
    this.DTEntrada = data.prospecto;
    this.obtenerComponenteId();

   }

   obtenerComponenteId = () => {
    this.Services.obtenerId(this.DTEntrada?.id).subscribe({
      next: (data) => {
        const response: SimpleResponse = data;
        if (response.error) {
          showBasicAlert('Ups', response.msg, 'error')
        } else {
          this.DTEntrada = response.payload;
          this.formulario.patchValue({
              nombre: this.DTEntrada?.nombre,
              apellidoP: this.DTEntrada?.apellidoP,
              apellidoM: this.DTEntrada?.apellidoM,
              calle: this.DTEntrada?.calle,
              colonia: this.DTEntrada?.colonia,
              numero: this.DTEntrada?.numero,
              codigoPostal: this.DTEntrada?.codigoPostal,
              telefono: this.DTEntrada?.telefono,
              rfc: this.DTEntrada?.rfc,
         
          })
        }
      },
      error: (err) => {
        showBasicAlert('Ups', err.message, 'error')
      }
    })
  }
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

    // if (campo === 'nombre') {
    //   if (this.formulario.get('nombre')!.hasError('required')) {
    //     return 'Coloque número de consultorio';
    //   }
    // }

    // if (campo === 'ifCoctel') {
    //   if (this.formulario.get('ifCoctel')!.hasError('required')) {
    //     return 'Seleccione una empresa.';
    //   }
    // }

    // if (campo === 'idSoftRestaurant') {
    //   if (this.formulario.get('idSoftRestaurant')!.hasError('required')) {
    //     return 'Coloque una descripción.';
    //   }
    // }

    // if (campo === 'precio') {
    //   if (this.formulario.get('precio')!.hasError('required')) {
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



  editarComponente = () => {
    if (this.formulario.valid) {
      const consultorio = this.formulario.value;
      this.Services.editar(consultorio,this.DTEntrada?.id).subscribe({
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