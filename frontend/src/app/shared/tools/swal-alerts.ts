import { Observable } from 'rxjs';
import Swal from 'sweetalert2'


const showBasicAlert = (title:string,text:string,icon:any) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: 'Cerrar',
    allowEscapeKey: false
  });
}

const showArrayAlert = (title:string,text:string[],icon:any) => {
  Swal.fire({
    title,
    html: text.map((item:any)=>{
      return item.msg
    }).join('</br>'),
    icon,
    allowEscapeKey: false
  });
}
/**
 * @param title Titulo de la alerta
 * @param text  Cuerpo de la alerta
 * @param icon Tipo de alerta (success,error,info,question,warning)
 * @returns Retorna una promesa con la opción seleccionada
 */
const showConfirmAlert = (title:string,text:string,icon:any = 'info') => {
  return Swal.fire({
    title,
    html: text,
    icon,
    showCancelButton: true,
    confirmButtonColor: '#3f51b5',
    cancelButtonColor: 'gray',
    confirmButtonText: 'Confirmar!',
    cancelButtonText: 'Cerrar',
    reverseButtons: true,
    allowEscapeKey: false
  });
}

/**
 * @param title Titulo de la alerta
 * @param text  Cuerpo de la alerta
 * @param icon Tipo de alerta (success,error,info,question,warning)
 * @returns Retorna una promesa con la opción seleccionada
 */
 const showConfirmAlertPost = (title:string,text:string,icon:any = 'info',servicio:Observable<any>) => {
  return Swal.fire({
    title,
    html: text,
    icon,
    showCancelButton: true,
    confirmButtonColor: '#3f51b5',
    cancelButtonColor: 'gray',
    confirmButtonText: 'Confirmar!',
    cancelButtonText: 'Cerrar',
    reverseButtons: true,
    showLoaderOnConfirm: true,
    allowEscapeKey: false,
    preConfirm: ( ) => {
      return servicio;//this.servicioReportes.cambiarEstadoReporte(reporte,3)
    },
    allowOutsideClick: () => !Swal.isLoading(),

  });
}


//
/**
 * @param title Titulo de la alerta
 * @param text  Cuerpo de la alerta
 * @param icon Tipo de alerta (success,error,info,question,warning)
 * @returns Retorna una promesa con la opción seleccionada
 */
 const showConfirmAlertPostDeny = (title:string,text:string,icon:any = 'info',
                                   servicio:Observable<any>,servicioDeny:Observable<any>) => {


  return Swal.fire({
    title,
    html: text,
    icon,
    showCancelButton: true,
    showDenyButton: true,
    // showCancelButton: true,
    denyButtonText: `Rechazar!`,
    confirmButtonColor: '#3f51b5',
    cancelButtonColor: 'gray',
    confirmButtonText: 'Confirmar!',
    cancelButtonText: 'Cerrar',
    reverseButtons: true,
    showLoaderOnConfirm: true,
    allowEscapeKey: false,
    preConfirm: ( ) => {
      return servicio;//this.servicioReportes.cambiarEstadoReporte(reporte,3)
    },
    preDeny: ( ) => {
      return servicioDeny;
    },
    allowOutsideClick: () => !Swal.isLoading()
  });
}

/**
 * @param title Titulo de la alerta
 * @param text  Cuerpo de la alerta
 * @param icon Tipo de alerta (success,error,info,question,warning)
 * @returns Retorna una promesa con la opción seleccionada
 */
 const showConfirmAlertPostTextarea = (title:string,text:string,icon:any = 'info',
                                       servicio: {servicio: any, funcion: string, parametros: any },
                                       inputRequerido: boolean = false
                                       ) => {
  return Swal.fire({
    title,
    html: text,
    icon,
    input: 'text',
    inputPlaceholder: 'Comentarios',

    showCancelButton: true,
    confirmButtonColor: '#3f51b5',
    cancelButtonColor: 'gray',
    confirmButtonText: 'Confirmar!',
    cancelButtonText: 'Cerrar',
    reverseButtons: true,
    showLoaderOnConfirm: true,
    allowEscapeKey: false,
    preConfirm: ( comentario ) => {
      if (inputRequerido && !comentario) {
        return false;
      }
      servicio.parametros.comentario = comentario;
      return servicio.servicio[servicio.funcion](servicio.parametros);
    },
    allowOutsideClick: () => !Swal.isLoading(),

  });
}

/**
 * @param title Titulo de la alerta
 * @param text  Cuerpo de la alerta
 * @param icon Tipo de alerta (success,error,info,question,warning)
 * @returns Retorna una promesa con la opción seleccionada
 */
 const showConfirmAlertPostDenyInput = async (title:string,text:string,icon:any = 'info',
                                         servicio: {servicio: any, funcion: string, parametros: any },
                                         servicioDeny: {servicio: any, funcion: string, parametros: any }) => {


  return Swal.fire({
    title,
    html: text,
    icon,
    showCancelButton: true,
    showDenyButton: true,

    input: 'text',
    inputPlaceholder: 'Comentarios',
    returnInputValueOnDeny:true,
    denyButtonText: `Rechazar!`,
    confirmButtonColor: '#3f51b5',
    cancelButtonColor: 'gray',
    confirmButtonText: 'Confirmar!',
    cancelButtonText: 'Cerrar',
    reverseButtons: true,
    showLoaderOnConfirm: true,
    allowEscapeKey: false,

    preConfirm: ( comentario ) => {
      servicio.parametros.comentario = comentario;
      return servicio.servicio[servicio.funcion](servicio.parametros);
    },
    preDeny: ( comentario ) => {
       servicioDeny.parametros.comentario = comentario;
      return servicioDeny.servicio[servicioDeny.funcion](servicioDeny.parametros);
    },
    allowOutsideClick: () => !Swal.isLoading()
  })
}

/**
 * @param title Titulo de la alerta
 * @param text  Cuerpo de la alerta
 * @param icon Tipo de alerta (success,error,info,question,warning)
 * @returns Retorna una promesa con la opción seleccionada
 */
 const showConfirmAlertPostHtmlFecha = (title:string,text:string,icon:any = 'info',
                                       servicio: {servicio: any, funcion: string, parametros: any },
                                       inputRequerido: boolean = false
                                       ) => {
  const inputValue = undefined;
  return Swal.fire({
    title,
    // html: text,
    icon,
    html: `<input class="swal2-input" id="fechaConsulta" type="date" >` ,
    inputPlaceholder: 'Fecha',
    showCancelButton: true,
    confirmButtonColor: '#3f51b5',
    cancelButtonColor: 'gray',
    confirmButtonText: 'Confirmar!',
    cancelButtonText: 'Cerrar',
    reverseButtons: true,
    showLoaderOnConfirm: true,
    allowEscapeKey: false,
    inputValue,
    preConfirm: ( result ) => {
       const input:any = Swal.getHtmlContainer()?.querySelector("#fechaConsulta");
       const fecha = input?.value;
       if (!result ||fecha === '') {
        return false;
       }
       servicio.parametros.fecha = fecha;
      return servicio.servicio[servicio.funcion](servicio.parametros);
    },
    allowOutsideClick: () => !Swal.isLoading(),

  });
}

/**
 * @param title Titulo de la alerta
 * @param text  Cuerpo de la alerta
 * @param icon Tipo de alerta (success,error,info,question,warning)
 * @returns Retorna una promesa con la opción seleccionada
 */
 const showConfirmAlertPostSelect = (title:string,text:string,icon:any = 'info',
                                       servicio: {servicio: any, funcion: string, parametros: any },
                                       inputRequerido: boolean = false,
                                       opciones: any,
                                       placeholder: string = ''
                                       ) => {
  return Swal.fire({
    title,
    html: text,
    icon,
    input: 'select',
    inputPlaceholder: placeholder,
    inputOptions: opciones,
    showCancelButton: true,
    confirmButtonColor: '#3f51b5',
    cancelButtonColor: 'gray',
    confirmButtonText: 'Confirmar!',
    cancelButtonText: 'Cerrar',
    reverseButtons: true,
    showLoaderOnConfirm: true,
    allowEscapeKey: false,
    preConfirm: ( comentario ) => {
      if (inputRequerido && !comentario) {
        return false;
      }
      const datos = comentario.split("-")
      servicio.parametros.folio = datos[0];
      servicio.parametros.empresa = datos[1];
      return servicio.servicio[servicio.funcion](servicio.parametros);
    },
    allowOutsideClick: () => !Swal.isLoading(),

  });
}

/**
 * @param title Titulo de la alerta
 * @param text  Cuerpo de la alerta
 * @param icon Tipo de alerta (success,error,info,question,warning)
 * @returns Retorna una promesa con la opción seleccionada
 */
 const showConfirmAlertSelectSimple = (title:string,text:string,icon:any = 'info',
                                       inputRequerido: boolean = false,
                                       opciones: any,
                                       placeholder: string = ''
                                       ) => {
  return Swal.fire({
    title,
    html: text,
    icon,
    input: 'select',
    inputPlaceholder: placeholder,
    inputOptions: opciones,
    showCancelButton: true,
    confirmButtonColor: '#3f51b5',
    cancelButtonColor: 'gray',
    confirmButtonText: 'Confirmar!',
    cancelButtonText: 'Cerrar',
    reverseButtons: true,
    showLoaderOnConfirm: true,
    allowEscapeKey: false,
    preConfirm: ( response ) => {
      if (inputRequerido && !response) {
        return false;
      }
      return response;
    },
    allowOutsideClick: () => !Swal.isLoading(),

  });
}

export {
  showBasicAlert,
  showArrayAlert,
  showConfirmAlert,
  showConfirmAlertPost,
  showConfirmAlertPostDeny,
  showConfirmAlertPostTextarea,
  showConfirmAlertPostDenyInput,
  showConfirmAlertPostHtmlFecha,
  showConfirmAlertPostSelect,
  showConfirmAlertSelectSimple
}
