import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbAccordionConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { Router } from '@angular/router';
import { ConvocatoriaService } from 'src/app/service/convocatoria.service';
import { SolicitudService } from 'src/app/service/solicitud.service';
import { Convocatoria, Universidades } from 'src/app/Modelo/Convocatoria';
import { Ep } from 'src/app/Modelo/EP';
import { Requisito } from 'src/app/Modelo/Requisito';
import { Solicitud } from 'src/app/Modelo/Solicitud';
import { Viewer2Component} from "../../pages/viewer2/viewer2.component";
import { Viewer3Component} from "../../pages/viewer3/viewer3.component";
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { UsuariosService } from 'src/app/service/usuarios.service';



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
  listSolicitudes:Solicitud[]=[];
  bsModalRef: BsModalRef;
  title: string = "Solicitudes";

  requisitoo: boolean=false;
  solicitude: boolean=false
  escuelaa: boolean=false
  sel:boolean= false
  role: string = localStorage.getItem("rol")
  idu: number = Number(localStorage.getItem("idu"))
  idescul: number
  guardar:number
  constructor(private userService: UsuariosService ,private router:Router,private convocatoria:ConvocatoriaService, private modalService: NgbModal,private modalService2: BsModalService,private serviceSolicitud:SolicitudService) { }

  ngOnInit(): void {
    this.listAllConvocatorias();
    this.obtener_idescuela();
    this.validar_user()
  }
  validar_user(){
    if (this.role=='ROLE_SECRETARY') {
      this.escuelaa=true
      this.sel=false
    }else{
      this.solicitude=true
      this.sel=true
    }
  }
  obtener_idescuela(){
    if(this.role!="ROLE_SECRETARY"){
      this.userService.listar_idescuela(this.idu).subscribe(data=>{
        console.log(data)
        this.idescul=data['P_USUARIO']
        console.log(this.idescul)
      })
    }
    
  }
  listAllConvocatorias(){
    this.convocatoria.listaConvocatoria(2).subscribe((data)=>{
      this.listConvocatorias = data['LIST_CONVOCATORIA'];
      console.log("list listConvocatorias activos : ",this.listConvocatorias);
      
    })
  }
  getEscuelasIdConvo(){
    if (this.escuelaa) {
      console.log(this.selectedConvocatoria);
      this.serviceSolicitud.secreuni(this.selectedConvocatoria).subscribe((data)=>{
        this.UniversidadList = data['UNIVERSIDADES'];
        console.log("list UniversidadList activos : ",this.UniversidadList);
      })
    }else{
      this.idescul
      this.getSolicitudDirect(this.idescul)
    }
    
  }

  getSolicitudDirect(ep:number){
    this.escuelaa=false
    this.solicitude=true
    this.guardar=ep
    console.log("te"+ep,this.selectedConvocatoria)
    this.serviceSolicitud.solicitudesdirect(ep,this.selectedConvocatoria).subscribe((data)=>{

      this.listSolicitudes = data['SOLICITUDES'];
      console.log("list listSolicitudes activos : ",this.listSolicitudes);
      for (let index = 0; index <  this.listSolicitudes.length; index++) {
        this.listSolicitudes[index].fecha=this.listSolicitudes[index].fecha.substring(0,10);
      }
    })
    
    
  }

  selectConvocatoria(event: any) {
    this.selectedConvocatoria = event.target.value;
    this.getEscuelasIdConvo();
  }

  getRequisitoID(id:number){
    this.requisitoo=true
    this.solicitude=false
    this.serviceSolicitud.getSolicitudNidea(id).subscribe((data)=>{
      this.listRequisitos = data['REQUISITOS'];
      console.log("list listRequisitos  : ",this.listRequisitos);
    })
  }
  openModalWithComponent(idc:number) {
    console.log("open modeal",idc)
    const initialState = {
      
      title: 'Ver Documentos',
      id:idc
    };
    this.bsModalRef = this.modalService2.show(Viewer2Component, Object.assign({initialState},{class:'modal-xl'}));
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  openModalWithComponent3(idc:number) {
    console.log("open modeal",idc)
    const initialState = {
      
      title: 'Ver Documentos',
      idr:idc
    };
    this.bsModalRef = this.modalService2.show(Viewer3Component, Object.assign({initialState},{class:'modal-xl'}));
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
