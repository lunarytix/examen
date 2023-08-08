import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { capitalizeFirstLetter } from 'src/app/shared/tools/string-tools';
import { showArrayAlert, showBasicAlert } from 'src/app/shared/tools/swal-alerts';
import { Empresa } from '../../objects/empresa';
import { SimpleResponse } from '../../objects/simple-response';
import { Usuario } from '../../objects/usuario';
import { CompanysService } from '../../services/companys.service';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-frm-create-user',
  templateUrl: './frm-create-user.component.html',
  styles: [``]
})


export class FrmCreateUserComponent implements OnInit {

  empresas: Empresa[] = [];
  frmUsers: FormGroup = this.fb.group({
    nombre: [, [Validators.required , Validators.minLength(3)]],
    apellidoP: [, [Validators.required , Validators.minLength(3)]],
    apellidoM: [ ],
    correo: [, [Validators.required,Validators.email]],
    telefono: [ ],
    empresaId: [ , [Validators.required] ]
  })

  constructor(
    private companyService: CompanysService,
    private dialogRef: MatDialogRef<FrmCreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private fb: FormBuilder,
    private userService: UsersService
  ) {
    this.getCompanys();

  }

  ngOnInit(): void {
  }

  onNoClick = (): void => {
    this.dialogRef.close();
  }

  isValidform = ():boolean => {
    return !this.frmUsers.valid;
  }

  isValidField = (campo: string) => {
    if (this.frmUsers.controls[campo]) {

      return this.frmUsers.controls[campo].errors &&
             this.frmUsers.controls[campo].touched;
    }

    return;
  }

  getMessageError = (campo:string = '') => {

    if (campo === 'correo') {
      if (this.frmUsers.get('correo')!.hasError('required')) {
        return 'El correo electrónico es requerido';
      }
      return this.frmUsers.get('correo')!.hasError('email') ? 'Correo invalido' : '';
    }

    if (campo === 'EmpresaId') {
      return "Selecciona una empresa"
    }

    return "Campo debe tener minimo 3 caracteres."
  }

  getCompanys = () => {
    this.companyService.getCompanys().subscribe({
      next: (data) => {
        const response:SimpleResponse = data;
        if (response.error){
           showBasicAlert('Ups',response.msg,'error')
        }
        this.empresas = response.payload;

      },
      error: (err) => {
        showBasicAlert('Ups',err.message,'error')
      }
    })
  }


  saveUser = () => {
    const usuario:Usuario = this.frmUsers.value;
    usuario.password = '123456';

    if (this.frmUsers.valid) {

      this.userService.saveUser(usuario).subscribe({
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
          if (err.error.msg) {
            showBasicAlert('Ups',err.error.msg,'error')
            return;
          }
          showBasicAlert('Ups',err.message,'error')
        }
      })
    }

  }



}
