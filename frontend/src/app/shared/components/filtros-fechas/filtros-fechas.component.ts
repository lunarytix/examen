import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SimpleResponse } from 'src/app/main/objects/simple-response';
import { FiltroFechasService } from '../../services/filtro-fechas.service';
import { TipoGenerico } from '../../objetos/tipo-generico';
import { InputBusqueda } from '../../objetos/inputBusqueda';


@Component({
  selector: 'app-filtros-fechas',
  templateUrl: './filtros-fechas.component.html',
  styleUrls: ['./filtros-fechas.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class FiltrosFechasComponent implements OnInit {
  @Output() consultarDatos = new EventEmitter<FormGroup>();
  @Output() valorSelect = new EventEmitter<SimpleResponse>();

  @Input() mostrarEmpresas:boolean = false;
  @Input() mostrarTiposReporte:boolean = false;
  @Input() tiposReportes:TipoGenerico[] = [];
  @Input() formulario:InputBusqueda[] = [];
   // @Input() valorSeleccionado:{id:number,nombre:string} | undefined;
  empresaSeleccionada:{id:number,nombre:string} | undefined;
  tipoSeleccionado:{id:number,nombre:string} | undefined;

  @Input() empresas:any[] = [];


  frmFechas:FormGroup = this.fb.group ({
    inicial: [ ],
    final: [],
    // empresa: [],
    // tipo: [],
  });

  constructor(
    private fb: FormBuilder,
    private filtroServicio: FiltroFechasService
    ) {

      filtroServicio.forumulario.subscribe((form:InputBusqueda[]) =>{
          // form.map(e => {
          //   console.log(e);
          // })
         this.empresaSeleccionada = form.find(e => e.nombre === 'empresa')?.valor;
         this.tipoSeleccionado =  form.find(e => e.nombre === 'tipo')?.valor;
        // console.log(this.tipoSeleccionado );
        form.forEach( (item:any) => {
          this.frmFechas.setControl(item.nombre,this.fb.control(item?.valor,[Validators.required]));
        });

      });
    }

  ngOnInit() {
  }


  //Metodo para detectar cambios de variables,enviadas desde el componente padre
  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['empresas']?.currentValue) {
        // const valores = changes?.['empresas'].currentValue;
        // this.empresas = valores;
    // }
    // if (changes['formulario']) {
    //   const valores = changes?.['formulario'].currentValue;
    //   let tipo:any = {};
    //   valores.forEach( (item:any) => {
    //     if (item.nombre === 'tipo') {
    //       tipo = item?.valor;
    //     }
    //       this.frmFechas.setControl(item.nombre,this.fb.control(item?.valor,[Validators.required]));
    //   });
    //   this.tipoSeleccionado =  tipo;
    // }
     // Asignar valor inicial por defecto(solo al iniciar componente cambia esta bandera)
    //Busqueda inicial - Asigna los valos por defecto de los select 2, input empresa e tipo
    // this.empresaSeleccionada = this.formulario.find(e => e.nombre === 'empresa')?.valor;// {id:formulario,nombre:''};
    // this.tipoSeleccionado =  this.formulario.find(e => e.nombre === 'tipo')?.valor ;
    // //Asigna/crea el formulario reactivo con los input enviados del componente padre
    // this.formulario.forEach( (item:any) => {
    //   this.frmFechas.setControl(item.nombre,this.fb.control(item?.valor,[Validators.required]));
    // });
    // console.log(changes);
  }


  //Retornar valor todo el formulario(fechas,empresa,tipo) al componente padre,
  //cada vez que se le de clic al boton de consultar (onClic)
  aplicarFiltro = () => {
     this.consultarDatos.emit(this.frmFechas);
  }

 //Retornar valor de los select2 al componente padre, cada vez que cambie (onChange)
  obtenerSelect = (opcion: SimpleResponse) => {
     if (!opcion.error) {
      this.frmFechas.controls[opcion.msg]?.setValue(opcion.payload);
    }
    this.valorSelect.emit(opcion);
  }

}
