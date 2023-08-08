import { Component, Input, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OpcionTable } from '../../objetos/opcion-table';
import { CabeceraTable } from '../../objetos/cabecera-table';


@Component({
  selector: 'app-tabla-generica',
  templateUrl: './tabla-generica.component.html',
  styleUrls: ['./tabla-generica.component.scss']
  })
export class TablaGenericaComponent implements OnInit {
  @ViewChild('tableSort') tableSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input("datos") datos:any | undefined;
  @Input("columnas") columnas:CabeceraTable[] =[];

  @Input("paginado") paginado:boolean = false;
  @Input("orden") orden:{ columna: string; direccion: SortDirection } = {columna: '',direccion:''};
  @Input("busqueda") busqueda:boolean = false;
  //si se quiere mostrar totalizadores en el pie de la tabla,enviar columnas a totalizar
  @Input("columnasTotalizador") columnasTotalizador:{[key: string]: any} = {};
  //Leyenda de mat-card
  @Input("leyenda") leyenda:string = '';
  //aqui se guardan los totales por cada columna
  displayedColumns:string[] = [];
  dataSource:MatTableDataSource<any> = new MatTableDataSource<any>();

  @Input("opciones") opciones:OpcionTable[] = [];
  @Input("estados") estados:OpcionTable[] = [];

  constructor() {
  }

  ngOnInit() {

    this.dataSource = new MatTableDataSource<any>(this.datos);
    this.displayedColumns = this.columnas.map(object => object.nombre);
    // Calcular Totales
    this.calcularTotales();

  }

  //funcion para calcular totales
  calcularTotales = () => {
    // setTimeout(() => {
      if ( Object.keys(this.columnasTotalizador).length > 0) {
        for (const key in this.columnasTotalizador) {
          if (this.columnasTotalizador.hasOwnProperty(key)) {
            this.columnasTotalizador[key]['total'] = this.datos.map((item:any) => item[key]).reduce((acc:any, value:any) => acc + value, 0) ;
           }
        }
      }
    // }, 1000);
  }
  //Cuando cambia la informacion @Output(datos) se actualiza la grafica
  ngOnChanges(changes: SimpleChanges): void {

    if (changes?.['columnas']) {
      const valores = changes?.['columnas'].currentValue;
      this.columnas = valores;
      this.displayedColumns = this.columnas.map(object => object.nombre);
    }

    if (changes?.['datos']) {
      const valores = changes?.['datos'].currentValue;
      this.dataSource = new MatTableDataSource<any>(valores);
      this.inicializarAsignarFiltros();
      this.calcularTotales();
    }

  }

  ngAfterViewInit(): void {
    this.inicializarAsignarFiltros();
  }

  trackByIndex(i:any) { return i; }

  /*Iniciar Filtro(Esta en funcion porque se manda a llamar en ngAfterViewInit y cada vez que se actualiza la informacion) */
  inicializarAsignarFiltros = () => {
    if (this.orden) { this.dataSource.sort = this.tableSort; }
    if (this.paginado && this.paginator) {
      this.paginator!._intl.itemsPerPageLabel="Registros por página";
      this.paginator!._intl.nextPageLabel="Siguiente";
      this.paginator!._intl.previousPageLabel="Anterior";
      this.paginator!._intl.firstPageLabel="Primer página";
      this.paginator!._intl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
        const start = page * pageSize + 1;
        const end = (page + 1) * pageSize < length ? (page + 1) * pageSize : length;
        return `${start} - ${end} de ${length}`;
      };
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  obtenerTotalPorColumna = (columna: string ) => {
    return this.columnasTotalizador[columna];
  }

}
