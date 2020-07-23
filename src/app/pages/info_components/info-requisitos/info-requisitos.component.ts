import { Component, OnInit } from '@angular/core';
import { RequisitoService } from 'src/app/service/requisitoService/requisito.service';
import { Requisito } from 'src/app/Modelo/Requisito';

@Component({
  selector: 'app-info-requisitos',
  template: `<div>
  <div class="container">
      <div class="" *ngFor="let re of requi">
        <h1>{{re.nombre}}</h1>
      </div>
  </div>
  </div>`,
  styleUrls: ['./info-requisitos.component.scss']
})
export class InfoRequisitosComponent implements OnInit {

  constructor(private serviceRequisito:RequisitoService ) { }
  requi: Requisito[] = []

  ngOnInit(): void {
    this.requisito()   }
  idc:number;
  requisito(){
    this.serviceRequisito.getReqConve(1).subscribe((data)=>{
      this.requi=data['REQCONVE']
      console.log(data)
    })
  }

}
