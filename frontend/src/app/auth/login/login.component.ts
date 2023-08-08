import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/main/objects/empresa';
import { Usuario } from 'src/app/main/objects/usuario';
import { CompanysService } from 'src/app/main/services/companys.service';
import { showBasicAlert } from 'src/app/shared/tools/swal-alerts';
import { SimpleResponse } from '../../main/objects/simple-response';
import { AuthService } from '../services/auth.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

interface Parametros {
  usuario: Usuario,
  token: string 
}

declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
  movil: boolean = false;

  empresas: Empresa[] = [];
  peticion: boolean = false;
  hide: boolean = true;
  frmLogin = this.fb.group({
    correo: [localStorage.getItem('correo') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
    // remember: [localStorage.getItem('remember') || false]
  });

  frmRegistro = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    apellidoP: [, [Validators.required, Validators.minLength(3)]],
    apellidoM: [],
    correo: [, [Validators.required, Validators.email]],
    telefono: [],
    empresaId: [, [Validators.required]]
  });


  constructor(
    private auth_service: AuthService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router,
    private empresasServicio: CompanysService,
    private media: MediaObserver
  ) {
    // if (localStorage.getItem("token")){
    //   this.router.navigateByUrl("/main/modules/show");
    // }
    this.obtenerEmpresas();

    this.media.asObservable().subscribe((mediaChange:any) => {
      this.movil = this.getSize(mediaChange);
    });


  }


  private getSize(mediaChange: MediaChange): boolean {
    if (this.media.isActive('gt-sm')) {
    // if (this.media.isActive('gt-xs')) {
      return false;
    } else {
      // return 'over';
      return true;
    }
  }


  ngOnInit(): void {

  }

  obtenerEmpresas = () => {
    this.empresasServicio.getEmpresasPublic().subscribe({
      next: (data) => {
        const response: SimpleResponse = data;
        if (response.error) {
          showBasicAlert('Ups', response.msg, 'error')
        }
        this.empresas = response.payload;


      },
      error: (err) => {
        showBasicAlert('Ups', err.message, 'error')
      }
    })
  }


  isValidField = (campo: string) => {
    if (this.frmRegistro.controls[campo] !== undefined) {

      return this.frmRegistro.controls[campo].errors &&
        this.frmRegistro.controls[campo].touched;
    }
    return null;
  }

  getMessageError = (campo: string = '') => {

    if (campo === 'correo') {
      if (this.frmRegistro.get('correo')!.hasError('required')) {
        return 'El correo electrónico es requerido';
      }
      return this.frmRegistro.get('correo')!.hasError('email') ? 'Correo invalido' : '';
    }

    if (campo === 'empresaId') {
      return "Selecciona una empresa"
    }

    return "Campo debe tener minimo 3 caracteres."
  }



  invalidEmailMessage = () => {
    if (this.frmLogin.get('correo')!.hasError('required')) {
      return 'Ingrese correo electrónico';
    }
    return this.frmLogin.get('correo')!.hasError('email') ? 'Correo invalido' : '';
  }

  invalidPasswordMessage = () => {
    if (this.frmLogin.get('password')!.hasError('required')) {
      return 'Contraseña es requerida';
    }
    return 'La contraseña debe tener minimo 6 caracteres.';
  }

  isValidPassword = () => {
    return this.frmLogin.get('password')!.status === 'VALID';
  }

  isValidEmail = () => {
    return this.frmLogin.get('correo')!.status === 'VALID';
  }

  isValidForm = () => {
    return this.frmLogin.valid;
  }

  login = () => {
    if (!this.frmLogin.valid) {
      this.snackBar.open(`No se cumplen las validaciones.`, 'Cerrar', {
        duration: 3000
      });
      return;
    }
    this.peticion = true;
    const usuario: Usuario = this.frmLogin.value;
    this.auth_service.login(usuario).subscribe({
      next: (data) => {
        // this.peticion = false;
        const response: SimpleResponse = data;
        if (response.error){
          this.showErrosBack(response);
        }

        this.router.navigateByUrl("/main/modules/show");
      },
      error: (err) => {
        this.peticion = false;
        const response: SimpleResponse = err.error;
        this.showErrosBack(response);
      }
    });

  }

  registrarUsuario = () => {
    if (this.frmRegistro.valid) {
      this.peticion = true;
      const usuario: Usuario = this.frmRegistro.value;

      this.auth_service.registroUsuario(usuario).subscribe({
        next: (data) => {
          // this.peticion = false;
          const response: SimpleResponse = data;
          if (response.error) {
            this.showErrosBack(response);
          }

          showBasicAlert("Exito!", data.msg, "success");
          this.frmRegistro.reset();
        },
        error: (err) => {
          this.peticion = false;
          const response: SimpleResponse = err.error;
          this.showErrosBack(response);
        }
      });

    }
  }

  showErrosBack = (response: SimpleResponse) => {
    if (response?.payload?.errors) {
      const errors: Array<any> = response.payload.errors;
      errors.forEach((error: any) => {
        this.snackBar.open(`Error: ${error.msg}`, 'Cerrar', {
          duration: 3000
        });
      });
      return;
    }

    this.snackBar.open(`Error: ${response?.msg}`, 'Cerrar', {
      duration: 3000
    });


  }

  // ngAfterViewInit(): void {
  //   google.accounts.id.initialize({
  //     // client_id: "251947188956-7ak3phm2j9t9pioi1i1kma2jp1lcatdg.apps.googleusercontent.com",
  //     client_id: "677603181121-vcvcip44futste1ado4rursvvnom8arc.apps.googleusercontent.com",
  //     auto_select: true,
  //     callback: (response: any) => this.handleGoogleSignIn(response),
  //   });

  //   google.accounts.id.renderButton(
  //     document.getElementById("googleButtonDiv"),
  //     // { theme: 'outline', size: "large", type: "icon", shape: "rectangular",  width: "330", logo_alignment: "center" }  // customization attributes
  //     { theme: 'outline', size: "medium", type: "standard", shape: "rectangular",  width: "100", logo_alignment: "center" }  // customization attributes
  //     );
  //   // google.accounts.id.prompt()
  // }

  handleGoogleSignIn(response: any) {
    this.peticion = true;

    // This next is for decoding the idToken to an object if you want to see the details.
    let base64Url = response.credential.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let payload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const jsonPayload = JSON.parse(payload);


    const body: Parametros = {
      usuario: jsonPayload,
      token: response?.credential
    }

    if (!body.token || !body.usuario) {
      return;
    }
    this.auth_service.loginGoogle(body).subscribe({
      next: (data) => {
        this.peticion = false;
        const response: SimpleResponse = data;
        if (response.error){
          this.showErrosBack(response);
          return;
        }
        // window.location.href = "/main/modules/show";
        this.router.navigateByUrl("/main/modules/show");
        window.location.reload();
      },
      error: (err) => {
        this.peticion = false;
        const response: SimpleResponse = err.error;
        this.showErrosBack(response);
      }
    });



  }

}
