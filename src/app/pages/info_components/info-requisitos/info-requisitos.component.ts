import { Component, OnInit, Input } from '@angular/core';
import { RequisitoService } from 'src/app/service/requisitoService/requisito.service';
import { Requisito } from 'src/app/Modelo/Requisito';

@Component({
  selector: 'app-info-requisitos',
  template: `<div>
  <div class="container">
      <div class="" *ngFor="let re of idconvenio">
        <h1>{{re.nombre}}</h1>
      </div>
  </div>
  </div>`,
  styleUrls: ['./info-requisitos.component.scss']
})
export class InfoRequisitosComponent implements OnInit {
  @Input() idconvenio:Requisito[]
  constructor( ) { }
  requi: Requisito[] = []

  ngOnInit(): void {
  }
  idc:number;
}
