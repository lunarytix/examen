import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { showArrayAlert, showBasicAlert } from 'src/app/shared/tools/swal-alerts';
import { Modulo } from '../../objects/modulo';
import { SimpleResponse } from '../../objects/simple-response';
import { ModulesService } from '../../services/modules.service';

@Component({
  selector: 'app-frm-create-module',
  templateUrl: './frm-create-module.component.html',
  styles: [
  ]
})
export class FrmCreateModuleComponent implements OnInit {

  frmModules: FormGroup = this.fb.group({
    nombre: [, [Validators.required , Validators.minLength(3)]],
    descripcion: [, [Validators.required , Validators.minLength(3)]],
    url: [, [Validators.required , Validators.minLength(3)]]
  })
  constructor(
    private modulesService: ModulesService,
    private dialogRef: MatDialogRef<FrmCreateModuleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Modulo,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onNoClick = (): void => {
    this.dialogRef.close();
  }

  isValidform = ():boolean => {
    return !this.frmModules.valid;
  }

  isValidField = (campo: string) => {
    return this.frmModules.controls[campo].errors &&
           this.frmModules.controls[campo].touched;
  }

  getMessageError = (campo:string = '') => {

    if (campo === 'correo') {
      if (this.frmModules.get('correo')!.hasError('required')) {
        return 'El correo electrónico es requerido';
      }
      return this.frmModules.get('correo')!.hasError('email') ? 'Correo invalido' : '';
    }

    if (campo === 'EmpresaId') {
      return "Selecciona una empresa"
    }

    return "Campo debe tener minimo 3 caracteres."
  }

  saveModule = () => {
    const modulo:Modulo = this.frmModules.value;

    if (this.frmModules.valid) {

      this.modulesService.saveModule(modulo).subscribe({
        next: (data) => {
          const response:SimpleResponse = data;
          if (response.error){
             showBasicAlert('Ups',response.msg,'error')
          }
          this.dialogRef.close(response);

        },
        error: (err) => {
          if (err.error.payload.errors) {
            showArrayAlert('Ups',err.error.payload.errors,'error')
            return;
          }
          showBasicAlert('Ups',err.message,'error')
        }
      })
    }

  }

}
