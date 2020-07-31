import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbAccordionConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import Swal from 'sweetalert2';
import { Requisito } from 'src/app/Modelo/Requisito';
import { OpcionService } from 'src/app/service/opcionService/opcion.service';
import { Router } from '@angular/router';
import { RequisitoService } from 'src/app/service/requisitoService/requisito.service';
import { Convenio } from 'src/app/Modelo/Convenio';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { Viewer2Component} from "../../pages/viewer2/viewer2.component";
import { SolicitudService } from 'src/app/service/solicitud.service';
import { Solicitud} from 'src/app/Modelo/Solicitud';


@Component({
  selector: 'app-recepcionardoc',
  templateUrl: './recepcionardoc.component.html',
  styleUrls: ['./recepcionardoc.component.scss']
})

export class RecepcionardocComponent implements OnInit {
  show:boolean = true;
  listReq:Requisito[]=[]
  listConvenios:Convenio[]=[];
  selectedConvenio: number= 1;
  loadReqConveData: Requisito[]=[];

  file: string;
  title: string = "Solicitudes"
  requisitos: boolean=false
  solicitudes: boolean=true
  carga:boolean=true
  recarga: boolean=false

  bsModalRef: BsModalRef;
  public archivoSeleccionado: File;


  ////////////////////////////////////// Solicitud Objetos - Arrays - variables //////////////////////

  solicitud: Solicitud;
  solicitudess: Solicitud[]=[];
  iduser:number =  Number(localStorage.getItem("idu"));
  constructor(private solicitudService: SolicitudService ,private modalService2: BsModalService,private _config:NgbAccordionConfig,private service:OpcionService,private router:Router, private service2:RequisitoService,  private modalService: NgbModal) { 
    _config.closeOthers=true;
  }

  ngOnInit(){
    //this.listar();
    this.getAllConvenio();
    this.getReqConve()
  }
  
  selecfoto(event){
    this.archivoSeleccionado = event.target.files[0];
    console.log(this.archivoSeleccionado);
    
    console.log(this.file.split("\\")[this.file.split("\\").length-1]);
    this.file=this.file.split("\\")[this.file.split("\\").length-1]
    
  }
  getReqConve(){
    console.log("hola"+this.selectedConvenio)
    this.service2.getReqConve(this.selectedConvenio).subscribe((data)=>{
      console.log("soy la data",data)
      this.loadReqConveData = data['REQCONVE'];
      console.log('busqueda de id'+this.loadReqConveData);
    })
  }
  getAllConvenio(){
    this.service2.getConvenios().subscribe((data)=>{
      console.log('Lista de convenios'+data);
      this.listConvenios = data['LIST_CONVENIOS'];
      console.log('Lista de convenios'+this.listConvenios);
    })
  }
  selectConvenio(event:any){
    this.selectedConvenio = event.target.value;
    this.getReqConve();
  }
  change(id) {
    switch (id) {
      case 1:
        document.getElementById('1').nodeValue='<i class=" tim-icons icon-minimal-up" (click)="change(1)" id="1">'
        break;
      case 2:
        alert("este es dos")
        break;
      case 3:
        alert("este es 3")
        break;
      case 4:
        alert("este es 4")
        break;
      case 5:
        alert("este es 5")
        break;
      default:
        Swal.fire('Error Desconocido', 'Comunicarse con el administrador', 'error');
        break;
    }
  }
  open(solicitud) {
    this.modalService.open(solicitud, {ariaLabelledBy: 'modal-basic-title'});
  }
  open2(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
  openrequisito(){
    this.requisitos=true;
    this.solicitudes=false
  }


  ////////////////////////////////////////////////// modal de documentos/////////////
  openModalWithComponent(idc:number) {
    const initialState = {
      
      title: 'Ver Documentos',
      id:idc
    };
    this.bsModalRef = this.modalService2.show(Viewer2Component, Object.assign({initialState},{class:'modal-xl'}));
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  
  crearsolicitud(){
    this.solicitud.idusuario=this.iduser
    this.solicitud.tipo=1
    this.solicitudService.crearSolicitud(this.solicitud).subscribe(data =>{
      console.log(data)
    })
  }

}
