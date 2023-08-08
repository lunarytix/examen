import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { showArrayAlert, showBasicAlert } from 'src/app/shared/tools/swal-alerts';
import { SimpleResponse } from '../../objects/simple-response';
import { Usuario } from '../../objects/usuario';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-frm-reset-password',
  templateUrl: './frm-reset-password.component.html',
  styles: [
  ]
})
export class FrmResetPasswordComponent implements OnInit {
  usuario!: Usuario;
  hide:boolean = true;

  frmUsers: FormGroup = this.fb.group({
    id: [ this.data.id ,[Validators.required]],
    password: [ , [Validators.required , Validators.minLength(6)]],
    passwordConfirm: [ , [Validators.required , Validators.minLength(6)]]
  },{
  validator: mustMatch('password', 'passwordConfirm')
  })

  constructor(
    private dialogRef: MatDialogRef<FrmResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private fb: FormBuilder,
    private userService: UsersService) {

    }

  ngOnInit(): void {
    this.usuario = this.data;
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
    if (campo === 'passwordConfirm') {
      return this.frmUsers.get('passwordConfirm')!.hasError('mustMatch') ? 'Contraseñas no coinciden' : 'Campo debe tener minimo 6 caracteres.';
    }
    return "Campo debe tener minimo 6 caracteres."
  }

  updatePassword = () => {
    const usuario:Usuario = this.frmUsers.value;

    if (this.frmUsers.valid) {

      this.userService.updatePassword(usuario).subscribe({
        next: (data) => {
          const response:SimpleResponse = data;
          if (response.error){
             showBasicAlert('Ups',response.msg,'error');
             return;
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
function mustMatch(controlName: string, matchingControlName: string): any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
    }

    if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
    } else {
        matchingControl.setErrors(null);
    }
}
}

