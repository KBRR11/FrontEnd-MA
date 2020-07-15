import { Component, OnInit } from '@angular/core';
import { Convocatoria } from 'src/app/Modelo/Convocatoria';
import { ConvocatoriaService } from 'src/app/service/convocatoria.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-convocatoria-crud',
  templateUrl: './convocatoria-crud.component.html',
  styleUrls: ['./convocatoria-crud.component.scss']
})
export class ConvocatoriaCRUDComponent implements OnInit {
  listaconvocatorias:Convocatoria[]=[]
  convocatora:Convocatoria = new Convocatoria();
  closeResult = '';
  constructor(private convocatoriaservice:ConvocatoriaService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listar();
  }
  listar(){
    this.convocatoriaservice.listaConvocatoria().subscribe((data)=>{
      console.log(data["LIST_CONVOCATORIA"])
      this.listaconvocatorias=data["LIST_CONVOCATORIA"]
    })
  }
  detalleconv(id:number){
    localStorage.setItem("idconvocaotria" , ""+id);
    alert(localStorage.getItem("idconvocaotria"))
    this.router.navigate(['detalleconv']);
  }
  elminarconv(id:number){
    this.convocatoriaservice.eliminarConvocatoria(id).subscribe(
      (data)=>{
        console.log(data);
      }
    )
  }
  buscarConvocatoria(convocatoria:Convocatoria){
    console.log(convocatoria)
    this.convocatora=convocatoria
    
  }
  editarconv(){
    this.convocatoriaservice.actualizarConvocatoria(this.convocatora).subscribe((data)=>{
      console.log(this.convocatora);
      this.listar();
    })
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
}
