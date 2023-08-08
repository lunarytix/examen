import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { showArrayAlert, showBasicAlert } from 'src/app/shared/tools/swal-alerts';
import { Empresa } from '../../objects/empresa';
import { SimpleResponse } from '../../objects/simple-response';
import { CompanysService } from '../../services/companys.service';

@Component({
  selector: 'app-frm-update-company',
  templateUrl: './frm-update-company.component.html',
  styles: [
  ]
})
export class FrmUpdateCompanyComponent implements OnInit {
  frmCompanys: FormGroup = this.fb.group({
    id: [ this.data.id , [Validators.required]],
    razonSocial: [  , [Validators.required , Validators.minLength(3)]],
    nombreComercial: [, [Validators.required , Validators.minLength(3)]],
    correo: [],
    direccion: [ ],
    latitud: [ ],
    longitud: [ ],
    telefono: [ ]
  })

  constructor(
    private companyService: CompanysService,
    private dialogRef: MatDialogRef<FrmUpdateCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Empresa,
    private fb: FormBuilder
  ) {
    this.getCompanyById( this.data );

   }

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

  updateCompany = () => {
    const empresa:Empresa = this.frmCompanys.value;

    if (this.frmCompanys.valid) {

      this.companyService.updateCompany(empresa).subscribe({
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


  getCompanyById = (empresa: Empresa) => {
    this.companyService.getCompanyById( empresa ).subscribe({
      next: (data) => {
        const response:SimpleResponse = data;
        if (response.error){
          showBasicAlert('Ups',response.msg,'error')
        }
         const { avatar, ...empresa} = response.payload;
         this.frmCompanys.setValue(empresa);
      },
      error: (err) => {
        const response:SimpleResponse = err.error;
        showBasicAlert('Ups',response.msg,'error')
      }
    })

  }

}
