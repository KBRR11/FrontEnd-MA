import { Component, OnInit, ɵConsole } from '@angular/core';
import { Convocatoria,DetalleConvocatoria } from "src/app/Modelo/Convocatoria";
import { ConvocatoriaService } from "src/app/service/convocatoria.service";
import { Ep } from 'src/app/Modelo/EP';
import { EpService } from 'src/app/service/Ep.service';

@Component({
  selector: 'app-detalleconvocatoria',
  templateUrl: './detalleconvocatoria.component.html',
  styleUrls: ['./detalleconvocatoria.component.scss']
})
export class DetalleconvocatoriaComponent implements OnInit {
  convocatorias: DetalleConvocatoria[]=[];
  listaep:Ep[]=[];
  constructor(private convocatoriaservice:ConvocatoriaService,private epservice:EpService) { }
  id:number = Number(localStorage.getItem("idconvocaotria"))
  ngOnInit(): void {
    this.Listar();
  }
  Listar() {
    this.convocatoriaservice.buscarDetConvocatoria(this.id).subscribe(
      (data) =>{

        this.convocatorias=data["DETALLE_CONVOCATORIA"];
        this.convocatorias.forEach(element => {
          element.hasta=element.hasta.substring(0,10)+" "
          element.desde=element.desde.substring(0,10)
        });
        console.log(this.convocatorias);
      },(error)=>{
        alert("OCURRIO UN ERROR "+error);
      }
    )
  }
  
  Crear(convocatoria:Convocatoria){
    this.convocatoriaservice.crearConvocatoria(convocatoria).subscribe(
      (data)=>{
        alert(data);
      },(error)=>{
        alert("OCURRIO UN ERROR "+error);
      }
    )
  }
  editardet(detconv:DetalleConvocatoria){
    console.log(detconv)
  }
  listaralumnos(idconvocatoria:number){
    //alert(idconvocatoria)
    this.convocatoriaservice.buscarAlumnoDetConvocatoria(idconvocatoria).subscribe(
      (data)=>{
        console.log(data);
      },(error)=>{
        alert("OCURRIO UN ERROR "+error);
      }
    )
  }
}
