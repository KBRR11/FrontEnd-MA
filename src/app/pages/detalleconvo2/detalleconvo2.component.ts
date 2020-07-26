import { Component, OnInit } from '@angular/core';
import { Convocatoria,DetalleConvocatoria } from "src/app/Modelo/Convocatoria";
import { ConvocatoriaService } from "src/app/service/convocatoria.service";
import { Ep } from 'src/app/Modelo/EP';
import { EpService } from 'src/app/service/Ep.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detalleconvo2',
  templateUrl: './detalleconvo2.component.html',
  styleUrls: ['./detalleconvo2.component.scss']
})
export class Detalleconvo2Component implements OnInit {

  constructor(private convocatoriaservice:ConvocatoriaService,private epservice:EpService, private modalService: NgbModal) { }
  title: string = "Convocatorias"
  convocatorias: DetalleConvocatoria[]=[];
  detconv:DetalleConvocatoria;
  listaep:Ep[]=[];
  id:number = Number(localStorage.getItem("idconvocaotria"))
  ngOnInit(): void {
  }
  Listar() {
    this.convocatoriaservice.buscarDetConvocatoria(this.id, 1).subscribe(
      (data) =>{

        this.convocatorias=data["DETALLE_CONVOCATORIA"];
        console.log(this.convocatorias);
      },(error)=>{
        alert("OCURRIO UN ERROR "+error);
      }
    )
  }
  update(){
    console.log(this.detconv)
    this.convocatoriaservice.actualizarDetConvocatoria(this.detconv).subscribe(
      (respons)=>{
        console.log(respons)
        this.Listar();
      },(error)=>{
        alert("OCURRIO UN ERROR "+error);
      }
    )
  }
}
