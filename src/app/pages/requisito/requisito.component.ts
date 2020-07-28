import { Component, OnInit } from '@angular/core';
import { RequisitoService } from 'src/app/service/requisitoService/requisito.service';
import { Router } from '@angular/router';
import { Requisito } from 'src/app/Modelo/Requisito';
import { Convenio } from 'src/app/Modelo/Convenio';
import Swal from 'sweetalert2';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { ViewerComponent} from "../../pages/viewer/viewer.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-requisito',
  templateUrl: './requisito.component.html',
  styleUrls: ['./requisito.component.scss']
})
export class RequisitoComponent implements OnInit {
  bsModalRef: BsModalRef;
  show:boolean=true;
  listRequisitos: Requisito[]=[];
  loadReqData: Requisito[]=[];
  loadRequisitoData: Requisito[] = [];
  listConvenios: Convenio[]=[];
  loadReqConveData: Requisito[]=[];
  loadReqConveData2: Requisito[]=[];
  ReqArchivo: Requisito[]=[];
  selectedConvenio: number= null;
  selectedConvenio2: number= null;
  selectedConvenio3: number= null;
  selectedConvenio4: number= null;
  estadovalue:number=null;
  archivoSeleccionado: File;
  convenio: Convenio = new Convenio();
  AddRequisito: Requisito = new Requisito();
  modRequisito: Requisito = new Requisito();
  constructor(private modalService: NgbModal,private service:RequisitoService,private router:Router) { }

  ngOnInit(){
    this.getVacio();
    this.getAllConvenio();
  }

  getVacio(){
    if (typeof this.loadReqConveData2=='object' && typeof this.loadReqConveData=='object') {
      console.log("Esta Vacio")
    } else {
      this.getReqConve();
    }
  }
  getAll(){
    this.service.getRequisito().subscribe((data)=>{
      console.log(data);
      this.listRequisitos = data['LIST_REQUISITO']
      console.log('Lista de requisitos'+this.listRequisitos)
    })
  }

  getId(requisito:Requisito):void{
    this.service.getRequisitoId(requisito.idrequisitos).subscribe((data)=>{
      this.loadReqData = data['P_IDREQUISITOS'];
      console.log('busqueda de id'+this.loadReqData);
    })
  }

  getAllConvenio(){
    this.service.getConvenios().subscribe((data)=>{
      console.log('Lista de convenios'+data);
      this.listConvenios = data['LIST_CONVENIOS'];
    })
  }

  getReqConve(){
    if(this.estadovalue==1){
      console.log("estamos en listado de estado 1");
      this.service.getReqConve(this.selectedConvenio).subscribe((data)=>{
        this.loadReqConveData = data['REQCONVE'];
      })
    }else if(this.estadovalue==0){
      console.log("estamos en listado de estado 0 ");
      this.service.getReqConve2(this.selectedConvenio).subscribe((data)=>{
        this.loadReqConveData2 = data['REQCONVE'];
      })
    }else{
      console.log("Intentelo Nuevamente")
    }
  }
  saveRequisito(){
    this.AddRequisito.idconvenio=this.selectedConvenio2;
    console.log('covenioID: '+ this.AddRequisito.idconvenio)
    this.service.createRequisito(this.AddRequisito).subscribe(data=>{
      this.service.getRequisito().subscribe((data)=>{
        console.log("soy la data dentro de save",data);
        this.ReqArchivo = data['LIST_REQUISITO'];
        console.log("IDNICK"+this.ReqArchivo[0].idrequisitos)
        this.service.crearArchivo(this.archivoSeleccionado,this.ReqArchivo[0].idrequisitos,4).subscribe((theone)=>{
          console.log(theone+"=zero");
        })
      })
      console.log("soy la data DE GUARDAR",data);
      (Swal.fire('Requisito',''+''+'Requisito registrado con éxito...!'))
    })
  }

  selectConvenio(event:any,id){
    this.selectedConvenio = event.target.value;
    this.estadovalue = event.target.value;
    this.estadovalue=id;
    this.getReqConve();
  }
  selectConvenio2(event:any){
    this.selectedConvenio2 = event.target.value;
  }
  selectConvenio3(event:any){
    this.selectedConvenio3 = event.target.value;
  }
  selectConvenio4(event:any){
    this.selectedConvenio4 = event.target.value;
  }

  DeleteRequisito(req:Requisito){
    Swal.fire({
      title:'¿Esta seguro?',
      text:'No podras revertir los cambios!',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar'
    }).then(result  =>{
      if(result.value){
        this.service.DeleteNoRequisito(req).subscribe((data)=>{
          Swal.fire('Eliminado!','Requisito Eliminado Correctamente!','success')
          this.getReqConve();
        })
      }
    })
  }

  loadRequisito(requisito: Requisito):void{
    this.service.getRequisitoId(requisito.idrequisitos).subscribe((data) => {
      console.log(requisito);
      this.loadRequisitoData = data['REQUISITO'];
    })
  }
  updateReq(requisito:Requisito){
    Swal.fire({
      title:'¿Esta seguro?',
      text:'Se modificaron los datos!',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Modificar'
    }).then(result  =>{
      if(result.value){
        console.log("update",requisito)
        this.service.updateRequisito(requisito).subscribe((data)=>{
          Swal.fire('Modificado!','Requisito Modificado Correctamente!','success')
          this.getReqConve();
        })
      }
    })
  }

  selecfoto(event){
    this.archivoSeleccionado = event.target.files[0];
    console.log(this.archivoSeleccionado);
  }

  openModalWithComponent() {
    const initialState = {
      
      title: 'Ver Documentos',
      size: 'xl'
    };
    const theone = this.modalService.open(ViewerComponent, initialState);
    theone.componentInstance.closeBtnName = 'Close';
    //this.bsModalRef.content.closeBtnName = 'Close';
  }
  
}
