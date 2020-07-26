import { Component, OnInit } from '@angular/core';
import { RequisitoService } from 'src/app/service/requisitoService/requisito.service';
import { Requisito } from 'src/app/Modelo/Requisito';
import { ConvenioService } from 'src/app/service/convenio.service';

@Component({
  selector: 'app-info-convocatoria',
  templateUrl: './info-convocatoria.component.html',
  styleUrls: ['./info-convocatoria.component.scss']
})
export class InfoConvocatoriaComponent implements OnInit {
  currentJustify = 'fill';
  idconvenio:number;
  conve: any
  escuela: any
  respuesta: String
  constructor(private serviceRequisito:RequisitoService, private convenioService:ConvenioService) { }
  requi: Requisito[] = []
  ngOnInit(): void {
    
  }
  
  openCity(evt, cityName: string) {
    var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  document.getElementById(cityName).style.display = "block";
  //evt.currentTarget.className += "active";
  }
  
  updateid(e){
    console.log(e)
    this.idconvenio=e
    this.requisito();
    this.validar()

  }

  validar(){
    this.convenioService.getValidar(this.idconvenio, 1).subscribe((data) =>{
      this.respuesta=data['RESPUESTA']
      console.log(this.respuesta)
  })
  }
  requisito(){
    this.serviceRequisito.getReqConve(this.idconvenio).subscribe((data)=>{
      this.requi=data['REQCONVE']
      console.log(data)
    })
  }
  updatedataConvenio(e){
    console.log(e)
    this.openCity(e, 'Information')
    this.conve=e
  }
  updatedataEscuela(e){
    console.log(e)
    this.escuela=e
  }
  
}
