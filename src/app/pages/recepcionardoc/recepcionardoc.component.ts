import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbAccordionConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import Swal from 'sweetalert2';
import { Requisito } from 'src/app/Modelo/Requisito';
import { OpcionService } from 'src/app/service/opcionService/opcion.service';
import { Router } from '@angular/router';
import { RequisitoService } from 'src/app/service/requisitoService/requisito.service';
import { Convenio } from 'src/app/Modelo/Convenio';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { Viewer3Component } from "../../pages/viewer3/viewer3.component";
import { Viewer2Component} from "../../pages/viewer2/viewer2.component";
import { SolicitudService } from 'src/app/service/solicitud.service';
import { Solicitud} from 'src/app/Modelo/Solicitud';
import { Convocatoria, Universidades } from 'src/app/Modelo/Convocatoria';


@Component({
  selector: 'app-recepcionardoc',
  templateUrl: './recepcionardoc.component.html',
  styleUrls: ['./recepcionardoc.component.scss']
})

export class RecepcionardocComponent implements OnInit {
  show:boolean = true;
  listReq:Requisito[]=[]
  listConvenios:Convenio[]=[];
  
  loadReqConveData: Requisito[]=[];
  listConvoActivas: Convocatoria[]=[];
  listConvoActivas2: Convocatoria[]=[];
  listUniversity: Universidades[]=[];
  listUniversity2: Universidades[]=[];
  listSolicitud: Solicitud[]=[];
  listRequisitos:Requisito[]=[]

  AddSolicitud: Solicitud= new Solicitud();
  //AddArchivo: Solicitud_Requisito = new Solicitud_Requisito();
  listConvoActivas3: string[]=[];

  selectedConvenio: number= 1;
  selectedConvoActivas: number=null;
  selectedUniversidad: number=null;

  file: string;
  title: string = "Solicitudes"
  requisitos: boolean=false
  solicitudes: boolean=true
  carga:boolean=true
  recarga: boolean=false
  soli:boolean=true
  requi:boolean=false

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
    this.getReqConve();
    this.getSolicitud();
  }
  getSolicitud(){
    this.solicitudService.getSolicitud(this.iduser).subscribe((data)=>{
      this.listSolicitud = data['SOLICITUD'];
      console.log("list listSolicitud activos : ",this.listSolicitud);
    })
  }

  getSolicitudId(idsolicitud:number){
    this.soli=false
    this.requi=true
    console.log(idsolicitud,"idsolicitud")
    this.solicitudService.getSolicitudNidea(idsolicitud).subscribe((data)=>{
      this.listRequisitos = data['REQUISITOS'];
      console.log("list listRequisitos  : ",this.listRequisitos);
    })
  }
  getConvActivas(){
    console.log(this.iduser)
    this.solicitudService.Listar_Convactivas(this.iduser).subscribe((data)=>{
      this.listConvoActivas = data['CONVOCATORIA'];
      console.log("list convenios activos : ",this.listConvoActivas);
    this.listConvoActivas2 = this.listConvoActivas.filter((valorActual, indiceActual, arreglo) => {
      console.log("indice actual", indiceActual,"indice arreglo",arreglo,"indice valorActual",valorActual);
        return arreglo.findIndex(valorDelArreglo => JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)) === indiceActual
    });
    console.log("Sin repetidos es:", this.listConvoActivas2);
    })
  }
  getUniversidad(){
    this.solicitudService.get_University(this.iduser).subscribe((data)=>{
    this.listUniversity = data['UNIVERSIDADES'];
    console.log("list universidades activos : ",this.listUniversity);
    this.listUniversity2 = this.listUniversity.filter((valorActual, indiceActual, arreglo) => {
      return arreglo.findIndex(valorDelArreglo => JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)) === indiceActual
    });
    console.log(" listUniversity2 Sin repetidos es:", this.listUniversity2);
    })
  }
  update(){
    this.AddSolicitud.idusuario=this.iduser;
    console.log("this.selectedConvoActivas1",this.selectedConvoActivas);
    console.log("this.selectedConvoActivas2",this.selectedConvoActivas);
    this.AddSolicitud.idconvenio=Number(this.listConvoActivas3[0]);
    this.AddSolicitud.tipo=1;
    console.log(this.listConvoActivas3)
    console.log("this.listConvoActivas3.iduniversidad",this.listConvoActivas3[1])
    this.solicitudService.getSolicitud_DetalleConvo(this.iduser,Number(this.listConvoActivas3[1]) ,this.selectedConvoActivas).subscribe((data)=>{
      console.log("soy la data",data)
      this.AddSolicitud.idconvocatoria=data['SOLICITUD'][0].iddetalle_convocatoria;
      console.log(this.AddSolicitud.idconvocatoria);
      this.crearSolicitud();
    })
    
  }
  crearSolicitud(){
    console.log("this.selectedConvoActivas",this.selectedConvoActivas);
    console.log("this.selectedUniversidad",this.selectedUniversidad)
    console.log(this.AddSolicitud,"solicitud crear")
    this.solicitudService.crearSolicitud(this.AddSolicitud).subscribe((data)=>{
      (Swal.fire('Solicitud', '' + '' + 'Solicitud registrada con éxito...!','success'))
      
    })
  }
  selectfoto(event,id:number){
    this.archivoSeleccionado = event.target.files[0];
    console.log(this.archivoSeleccionado);
    this.createArchivo(id);
  //console.log(this.file.split("\\")[this.file.split("\\").length-1]);
  //this.file=this.file.split("\\")[this.file.split("\\").length-1]
    
  }
  createArchivo(id:number){
    console.log("id");
    this.solicitudService.createSolicitudArchivo(id,this.archivoSeleccionado).subscribe(data => {
      console.log("soy la data DE GUARDAR", data);
      (Swal.fire('Requisito', '' + '' + 'Requisito registrado con éxito...!','success'))
    })
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
      console.log('Lista de convenios',this.listConvenios);
    })
  }
  selectConvenio(event:any){
    this.selectedConvenio = event.target.value;
    this.getReqConve();
  }
  selectConvoActivas(event:any){
    this.selectedConvoActivas= event.target.value;
    console.log(this.selectedConvoActivas);
  }

  selectUniversidad(event:any){
    this.listConvoActivas3= (event.target.value).split(',');
    console.log(this.listConvoActivas3);
    console.log("estamos en select universidad")
    console.log(event.target.value)
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
    console.log("open modeal",idc)
    const initialState = {
      
      title: 'Ver Documentos',
      id:idc
    };
    this.bsModalRef = this.modalService2.show(Viewer2Component, Object.assign({initialState},{class:'modal-xl'}));
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  openModalWithComponent2(idc:number) {
    console.log("open modeal",idc)
    const initialState = {
      
      title: 'Ver Documentos',
      idr:idc
    };
    this.bsModalRef = this.modalService2.show(Viewer3Component, Object.assign({initialState},{class:'modal-xl'}));
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
