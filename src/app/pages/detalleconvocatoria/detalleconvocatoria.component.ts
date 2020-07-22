import { Component, OnInit, ɵConsole } from '@angular/core';
import { Convocatoria,DetalleConvocatoria } from "src/app/Modelo/Convocatoria";
import { ConvocatoriaService } from "src/app/service/convocatoria.service";
import { Ep } from 'src/app/Modelo/EP';
import { EpService } from 'src/app/service/Ep.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detalleconvocatoria',
  templateUrl: './detalleconvocatoria.component.html',
  styleUrls: ['./detalleconvocatoria.component.scss']
})
export class DetalleconvocatoriaComponent implements OnInit {

  title: string = "Detalle de Convocatorias"
  ///////////////////

  convocatorias: DetalleConvocatoria[]=[];
  listaep:Ep[]=[];
  alumno: any[]=[];
  constructor(private convocatoriaservice:ConvocatoriaService,private epservice:EpService, private modalService: NgbModal) { }
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
  elminardet(idconvocatoria:number){
    this.convocatoriaservice.eliminarDetConvocatoria(idconvocatoria).subscribe(
      (data)=>{
        console.log(data);
      },(error)=>{
        alert("OCURRIO UN ERROR "+error);
      }
    )
  }
  listaralumnos(idconvocatoria:number){
    //alert(idconvocatoria)
    this.convocatoriaservice.buscarAlumnoDetConvocatoria(idconvocatoria).subscribe(
      (data)=>{
        this.alumno=data['CONVOCATORIA']
        console.log(data);
      },(error)=>{
        alert("OCURRIO UN ERROR "+error);
      }
    )
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
}
