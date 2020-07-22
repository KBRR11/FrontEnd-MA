import { Component, OnInit } from '@angular/core';
import { Convenio } from 'src/app/Modelo/Convenio';
import { ConvenioService } from 'src/app/service/convenio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-vacantes',
  template: `<div class="container">
      <div class="" *ngFor="let con of conve">
        <h1>{{con.nom_c_ep}}</h1>
        <div class="">
  <img src="http://localhost:8090/upload/2/{{con.idconvenio}}">
</div>
      </div>
      
  </div>`,
  styleUrls: ['./info-vacantes.component.scss']
})
export class InfoVacantesComponent implements OnInit {

  constructor(private serviceConvenio:ConvenioService, private router:Router ) { }
  conve: Convenio[] = []
  ngOnInit(): void {
    this.convenios()
  }
  idc:number;
  convenios(){
    this.serviceConvenio.getConvenioId(2).subscribe((data)=>{
      this.conve=data['CONVENIOS']
      console.log(data)
    })
  }


}
