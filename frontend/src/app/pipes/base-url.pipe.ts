import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "src/environments/environment";

@Pipe({
  name: 'baseUrl'
})

export class BaseUrlPipe implements PipeTransform {
  private baseUrl:string = environment.base_url;

  transform = (value: any, ...args: any[]):string => {
    return `${this.baseUrl}/${value}`
  }
}
