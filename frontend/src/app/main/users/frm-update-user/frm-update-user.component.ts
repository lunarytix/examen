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
  selector: 'app-frm-update-user',
  templateUrl: './frm-update-user.component.html',
  styleUrls: ['./frm-update-user.component.scss']
})
export class FrmUpdateUserComponent implements OnInit {

  empresas: Empresa[] = [];
  usuario!: Usuario;

  frmUsers: FormGroup = this.fb.group({
    id: [ this.data.id ,[Validators.required]],
    nombre: [ , [Validators.required , Validators.minLength(3)]],
    apellidoP: [ , [Validators.required , Validators.minLength(3)]],
    apellidoM: [ ],
    correo: [ , [Validators.required,Validators.email]],
    telefono: [ ],
    empresaId: [ , [Validators.required] ]
  })

  constructor(
    private companys_service: CompanysService,
    public dialogRef: MatDialogRef<FrmUpdateUserComponent>,
    private fb: FormBuilder,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
  ) {
    this.usuario = this.data;
    this.getCompanys();
    this.getUserById( this.usuario );
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
    return this.frmUsers.controls[campo].errors &&
           this.frmUsers.controls[campo].touched;
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
    this.companys_service.getCompanys().subscribe({
      next: (data) => {
        const response:SimpleResponse = data;
        if (response.error)
          showBasicAlert('Ups',response.msg,'error')

        this.empresas = response.payload
        /*.map((item:Empresa)=>{
          item.razonSocial = capitalizeFirstLetter(item.razonSocial)
          return item;
        })*/;

      },
      error: (err) => {
        const response:SimpleResponse = err.error;
        showBasicAlert('Ups',response.msg,'error')
      }
    })
  }

  getUserById = (usuario: Usuario) => {
    this.userService.getUserById( usuario ).subscribe({
      next: (data) => {
        const response:SimpleResponse = data;
        if (response.error){
          showBasicAlert('Ups',response.msg,'error')
        }
         const { avatar, verificado, nombreCompleto,rolId, ...usuario} = response.payload;
         this.frmUsers.get('EmpresaId')?.setValue(usuario.empresaId);
         this.frmUsers.setValue(usuario);
      },
      error: (err) => {
        const response:SimpleResponse = err.error;
        showBasicAlert('Ups',response.msg,'error')
      }
    })

  }

  updateUser = () => {
    const usuario = this.frmUsers.value;

    if (this.frmUsers.valid) {

      this.userService.updateUser(usuario).subscribe({
        next: (data) => {
          const response:SimpleResponse = data;
          if (response.error)
             new Error(response.msg);

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
