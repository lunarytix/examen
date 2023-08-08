import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { showArrayAlert, showBasicAlert } from 'src/app/shared/tools/swal-alerts';
import { Empresa } from '../../objects/empresa';
import { SimpleResponse } from '../../objects/simple-response';
import { CompanysService } from '../../services/companys.service';

@Component({
  selector: 'app-frm-create-company',
  templateUrl: './frm-create-company.component.html',
  styles:[

  ]
})
export class FrmCreateCompanyComponent implements OnInit {
  frmCompanys: FormGroup = this.fb.group({
    razonSocial: [, [Validators.required , Validators.minLength(3)]],
    nombreComercial: [, [Validators.required , Validators.minLength(3)]],
    correo: [],
    direccion: [ ],
    latitud: [ ],
    longitud: [ ],
    telefono: [ ]
  })
  constructor(
    private companyService: CompanysService,
    private dialogRef: MatDialogRef<FrmCreateCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Empresa,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }



  onNoClick = (): void => {
    this.dialogRef.close();
  }

  isValidform = ():boolean => {
    return !this.frmCompanys.valid;
  }

  isValidField = (campo: string) => {
    return this.frmCompanys.controls[campo].errors &&
           this.frmCompanys.controls[campo].touched;
  }

  getMessageError = (campo:string = '') => {

    if (campo === 'correo') {
      if (this.frmCompanys.get('correo')!.hasError('required')) {
        return 'El correo electrónico es requerido';
      }
      return this.frmCompanys.get('correo')!.hasError('email') ? 'Correo invalido' : '';
    }

    if (campo === 'EmpresaId') {
      return "Selecciona una empresa"
    }

    return "Campo debe tener minimo 3 caracteres."
  }

  saveCompany = () => {
    const empresa:Empresa = this.frmCompanys.value;

    if (this.frmCompanys.valid) {

      this.companyService.saveCompany(empresa).subscribe({
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
