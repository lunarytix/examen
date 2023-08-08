 import { Inject, LOCALE_ID, Pipe, PipeTransform } from "@angular/core";
 import { formatCurrency, DatePipe, DecimalPipe } from '@angular/common';

@Pipe({
  name: 'dynamic'
})

export class DynamicPipe implements PipeTransform {

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe
    ){
     }

  transform = (value: any, ...args: any[]):string => {
    if (!args[0]) {
      return value;
    }
    return this.evaluarPipe(value,args[0].toLowerCase());
  }

  evaluarPipe = (valor: any, pipe:string) => {

    switch (pipe) {
      case 'uppercase':
        valor = valor?.toUpperCase();
        break;
      case 'lowercase':
        valor = valor?.toLowerCase();
        break;
      case 'currency':
        valor = formatCurrency(valor,this.locale,'$')
        break;
      case 'date':
        valor = this.datePipe.transform(valor,'dd/MM/yyyy')
        break;
      case 'datetime':
        valor = this.datePipe.transform(valor,'dd/MM/yyyy hh:mm a')
        break;
      case 'number':
        valor = this.decimalPipe.transform(valor)
        break;
      default:
        break;
    }
    return valor;
  }
}
