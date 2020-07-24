import { Component, OnInit } from '@angular/core';
import { Convenio } from 'src/app/Modelo/Convenio';
import { ConvenioService } from 'src/app/service/convenio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-convenios',
  template: `<div class="container">
              <div class="" *ngFor="let con of conve">
                <h1>{{con.nom_c_ep}}</h1>
              </div>
            </div>`,
  styleUrls: ['./info-convenios.component.scss']
})
export class InfoConveniosComponent implements OnInit {

  constructor(private serviceConvenio:ConvenioService, private router:Router) { }
  conve: Convenio[] = []
  ngOnInit(): void {
    this.convenios()

  }

  convenios(){
    this.serviceConvenio.getTodoCon().subscribe((data)=>{
      this.conve=data['LIST_CONVENIOS']
      console.log(data)
    })
  }

}
