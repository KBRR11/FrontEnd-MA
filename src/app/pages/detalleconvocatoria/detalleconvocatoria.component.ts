import { Component, OnInit } from '@angular/core';
import { Convocatoria } from "src/app/Modelo/Convocatoria";
import { ConvocatoriaService } from "src/app/service/convocatoria.service";

@Component({
  selector: 'app-detalleconvocatoria',
  templateUrl: './detalleconvocatoria.component.html',
  styleUrls: ['./detalleconvocatoria.component.scss']
})
export class DetalleconvocatoriaComponent implements OnInit {
  convocatorias: Convocatoria[]=[];
  constructor(private convocatoriaservice:ConvocatoriaService) { }

  ngOnInit(): void {
    this.Listar();
  }
  Listar(){
    this.convocatoriaservice.listaConvocatoria().subscribe(
      (data) =>{
        this.convocatorias=data["LIST_CONVOCATORIA"];
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
}
