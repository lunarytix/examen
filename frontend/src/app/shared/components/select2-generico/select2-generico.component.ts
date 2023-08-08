import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { SimpleResponse } from 'src/app/main/objects/simple-response';


@Component({
  selector: 'app-select2-generico',
  templateUrl: './select2-generico.component.html',
  styleUrls: ['./select2-generico.component.scss']
})
export class Select2GenericoComponent implements OnChanges {
  formData: FormGroup = this.fb.group({
    elementoCtrl: new FormControl(),
    // selectType: new FormControl(''),
  });

  @Output() obtenerSelect = new EventEmitter<SimpleResponse>();

  @Input("tipografia") tipografia:string = 'uppercase';
  @Input("leyenda") leyenda:string = 'Elementos';
  @Input("name") name:string = 'name';
  @Input("datos") datos:{id:number,nombre:string}[] = [];
  @Input("valorSeleccionado") valorSeleccionado:{id:number,nombre:string} | undefined;

  @ViewChild('singleSelect') singleSelect!: MatSelect;
  /** list of banks */
  protected elementos: any[] = []// ;
  /** control for the selected bank */
  // public elementoCtrl: FormControl = new FormControl();
  /** control for the MatSelect filter keyword */
  public filtroElementosCtrl: FormControl = new FormControl();
  /** list of banks filtered by search keyword */
  public elementosFiltrados: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  protected _onDestroy = new Subject<void>();

  constructor(
    private fb: FormBuilder
  ) {

    this.formData.controls["elementoCtrl"].valueChanges.subscribe(res => {
       const opcionSeleccionada:SimpleResponse = {
        error: false,
        msg: this.name.toLowerCase(),
        payload: this.formData.controls["elementoCtrl"].value
      }
      this.obtenerSelect.emit(opcionSeleccionada)
    })
  }


  ngOnChanges(changes: SimpleChanges): void {

    if (changes?.['datos']) {
      const valores = changes?.['datos'].currentValue;
      this.elementos = valores;
      this.elementosFiltrados.next(this.elementos.slice());
    }

    if (this.valorSeleccionado) {
      this.formData.controls['elementoCtrl'].setValue(this.valorSeleccionado)
    }

  }

  ngOnInit() {
    // set initial selection
    this.elementos = this.datos;
    // load the initial bank list
    this.elementosFiltrados.next(this.elementos.slice());
    // listen for search field value changes
    this.filtroElementosCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
         this.filtarElementos();
      });

  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  //Sets the initial value after the filteredBanks are loaded initially
   protected setInitialValue() {
    this.elementosFiltrados
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
      });
  }

  protected filtarElementos() {
    if (!this.elementos) {
      return;
    }
    // get the search keyword
    let search = this.filtroElementosCtrl.value;
    if (!search) {
      this.elementosFiltrados.next(this.elementos.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.elementosFiltrados.next(
      this.elementos.filter(elemento => elemento.nombre.toLowerCase().indexOf(search) > -1)
    );
  }



}
