import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConvocatoriaService } from 'src/app/service/convocatoria.service';
import { SolicitudService } from 'src/app/service/solicitud.service';
import { Convocatoria, Universidades } from 'src/app/Modelo/Convocatoria';
import { Ep } from 'src/app/Modelo/EP';
import { Requisito } from 'src/app/Modelo/Requisito';
import { Solicitud } from 'src/app/Modelo/Solicitud';

@Component({
  selector: 'app-recepcionardirectora',
  templateUrl: './recepcionardirectora.component.html',
  styleUrls: ['./recepcionardirectora.component.scss']
})
export class RecepcionardirectoraComponent implements OnInit {
  selectedConvocatoria: number = null;
  listConvocatorias:Convocatoria[]=[];
  UniversidadList:Ep[]=[];
  listRequisitos:Requisito[]=[];
  listSolicitudes:Solicitud[]=[]

  constructor(private convocatoria:ConvocatoriaService,private serviceSolicitud:SolicitudService,private router:Router) { }

  ngOnInit(): void {
    this.listAllConvocatorias();
    
  }

  listAllConvocatorias(){
    this.convocatoria.listaConvocatoria(2).subscribe((data)=>{
      this.listConvocatorias = data['LIST_CONVOCATORIA'];
      console.log("list listConvocatorias activos : ",this.listConvocatorias);
    })
  }
  getEscuelasIdConvo(){
    console.log(this.selectedConvocatoria);
    this.serviceSolicitud.secreuni(this.selectedConvocatoria).subscribe((data)=>{
      this.UniversidadList = data['UNIVERSIDADES'];
      console.log("list UniversidadList activos : ",this.UniversidadList);
    })
  }

  getSolicitudDirect(ep:number){
    this.serviceSolicitud.solicitudesdirect(ep,this.selectedConvocatoria).subscribe((data)=>{

      this.listSolicitudes = data['SOLICITUDES'];
      console.log("list listSolicitudes activos : ",this.listSolicitudes);
    })
  }

  selectConvocatoria(event: any) {
    this.selectedConvocatoria = event.target.value;
    this.getEscuelasIdConvo();
  }

  getRequisitoID(id:number){
    this.serviceSolicitud.getSolicitudNidea(id).subscribe((data)=>{
      this.listRequisitos = data['REQUISITOS'];
      console.log("list listRequisitos  : ",this.listRequisitos);
    })
  }
}
