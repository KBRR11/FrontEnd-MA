import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterdocument'
})
export class FilterdocumentPipe implements PipeTransform {

  transform(value: any, arg: any): unknown {
    const resultDocu = [];
    for(const document of value ){
if (document.N_DOCUMENTO.indexOf(arg) > -1) {
  resultDocu.push(document);
}
    }
    return resultDocu;
  }

}
