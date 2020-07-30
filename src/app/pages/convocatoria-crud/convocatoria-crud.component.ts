import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Convocatoria } from 'src/app/Modelo/Convocatoria';
import { ConvocatoriaService } from 'src/app/service/convocatoria.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { ViewerComponent} from "../../pages/viewer/viewer.component";
import { EpService } from 'src/app/service/Ep.service';
import { Ep } from 'src/app/Modelo/EP';

@Component({
  selector: 'app-convocatoria-crud',
  templateUrl: './convocatoria-crud.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./convocatoria-crud.component.scss']
})
export class ConvocatoriaCRUDComponent implements OnInit {
  idfacultad:number;
  listaep:Ep[]=[];
  title: string = "Convocatorias"
  //////////////
  bsModalRef: BsModalRef;
  es: number [] = [];
  listaconvocatorias:Convocatoria[]=[]
  convocatora:Convocatoria = new Convocatoria();
  closeResult = '';

  mevine: string
  rol:string = localStorage.getItem("rol")

  primera: boolean
  segunda: boolean
  constructor(private modalService2: BsModalService, private convocatoriaservice:ConvocatoriaService,private epservice:EpService, private router: Router, private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.listar();
  }
  listar(){
    if (this.rol=="ROLE_SECRETARY") {
      this.convocatoriaservice.listaConvocatoria(1).subscribe((data)=>{
        console.log(data["LIST_CONVOCATORIA"])
        this.listaconvocatorias=data["LIST_CONVOCATORIA"]
        for (let index = 0; index <  this.listaconvocatorias.length; index++) {
          this.listaconvocatorias[index].desde=this.listaconvocatorias[index].desde.substring(0,10);
          this.listaconvocatorias[index].hasta=this.listaconvocatorias[index].hasta.substring(0,10);
        }
      })
    } else if(this.rol=="ROLE_DIRECTOR"){
      console.log("me vine")
      this.convocatoriaservice.listaConvocatoria(2).subscribe((data)=>{
        console.log(data["LIST_CONVOCATORIA"])
        this.listaconvocatorias=data["LIST_CONVOCATORIA"]
        for (let index = 0; index <  this.listaconvocatorias.length; index++) {
          this.listaconvocatorias[index].desde=this.listaconvocatorias[index].desde.substring(0,10);
          this.listaconvocatorias[index].hasta=this.listaconvocatorias[index].hasta.substring(0,10);
        }
      })
    }
    
  }
  listarep(){
    console.log(this.idfacultad)
    
    this.epservice.getEpforId(this.idfacultad).subscribe(
      (data)=>{
        console.log(data);
        this.listaep = data["EP"];
      }
    )
  }
  sele(po: number){
    let varia: boolean = false;
    for (let index = 0; index < this.es.length; index++) {
      const element = this.es[index];
      if (element==po ) {
        varia = true;
        this.es.splice(index,1)
        break;
      }
    }
    if(!varia){
      this.es.push(po); 
    }
    console.log(this.es)
  }
  detalleconv(id:number){
    localStorage.setItem("idconvocaotria" , ""+id);
    alert(id)

    this.router.navigate(['detalleconv']);
  }
  elminarconv(id:number){
    this.convocatoriaservice.eliminarConvocatoria(id).subscribe(
      (data)=>{
        this.listar();

      }
    )
  }
  buscarConvocatoria(convocatoria:Convocatoria){
    console.log(convocatoria)
    this.convocatora=convocatoria
    this.convocatora.hasta=this.convocatora.hasta.substring(0,10)
    this.convocatora.desde=this.convocatora.desde.substring(0,10)
    
  }
  editarconv(){
    this.convocatoriaservice.actualizarConvocatoria(this.convocatora).subscribe((data)=>{
      console.log(this.convocatora);
      this.listar();
    })
  }
  open(content) {
    this.modalService.open(content, {size: 'xl'});
  }
  open2(pila) {
    this.modalService.open(pila, {size: 'xl'});
  }

  openModalWithComponent(idc:number) {
    const initialState = {
      
      title: 'Ver Documentos',
      id:idc
    };
    this.bsModalRef = this.modalService2.show(ViewerComponent, Object.assign({initialState},{class:'modal-xl'}));
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
