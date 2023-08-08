import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "src/environments/environment";

@Pipe({
  name: 'titulo'
})

export class TituloPipe implements PipeTransform {
  private baseUrl:string = environment.base_url;

  transform = (value: any, ...args: any[]):string => {
    const primera = value.substr(0,1).toUpperCase();

    return `${primera}${value.substr(1)}`
  }
}
