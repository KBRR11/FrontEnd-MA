import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtercode'
})
export class FiltercodePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultCode = [];
    for(const code of value ){
if (code.CODIGO.indexOf(arg) > -1) {
  resultCode.push(code);
}
    }
    return resultCode;
  }

}
