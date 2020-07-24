import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Convenio } from 'src/app/Modelo/Convenio';
import { ConvenioService } from 'src/app/service/convenio.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-info-convenios',
  template: `<div class="container">
              <div class="" *ngFor="let con of conve">
                
                <a (click)="Cambio(con.idconvenio)">
                <img src="http://localhost:8090/upload/2/{{con.idconvenio}}">
                  {{con.nom_c_ep}}
                </a>
              </div>
            </div>`,
  styleUrls: ['./info-convenios.component.scss']
})
export class InfoConveniosComponent implements OnInit {
  @Output() idconvenio = new EventEmitter
  constructor(private serviceConvenio:ConvenioService, private router:Router) { }
  conve: Convenio[] = []
  ngOnInit(): void {
    this.convenios()

  }
  Cambio(idconv:number){
    this.idconvenio.emit(idconv);
  }
  convenios(){
    this.serviceConvenio.getTodoCon().subscribe((data)=>{
      this.conve=data['LIST_CONVENIOS']
      console.log(data)
    })
  }

}
