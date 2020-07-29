import { Component, OnInit, ɵConsole } from '@angular/core';
import { Convocatoria,DetalleConvocatoria } from "src/app/Modelo/Convocatoria";
import { ConvocatoriaService } from "src/app/service/convocatoria.service";
import { Ep } from 'src/app/Modelo/EP';
import { EpService } from 'src/app/service/Ep.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/Modelo/Usuarios';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-detalleconvocatoria',
  templateUrl: './detalleconvocatoria.component.html',
  styleUrls: ['./detalleconvocatoria.component.scss']
})
export class DetalleconvocatoriaComponent implements OnInit {

  title: string = "Detalle de Convocatorias"
  ///////////////////
  estado:string;
  convocatorias: DetalleConvocatoria[]=[];
  detconv:DetalleConvocatoria;
  listaep:Ep[]=[];
  alumno: any[]=[];
  user: Usuario;

  vengo: boolean
  home:boolean
  escul:boolean
  vacan:boolean=false
  lapiz:boolean=true
  check:boolean=false
  rol: string = localStorage.getItem("rol")
  es:number = Number(localStorage.getItem("idu"))
  vacante:number = 0

  constructor(private escuelaService:EpService,private convocatoriaservice:ConvocatoriaService,private epservice:EpService, private modalService: NgbModal) { }
  id:number = Number(localStorage.getItem("idconvocaotria"))
  ngOnInit(): void {
    
    this.convocatoriaservice.listaruser_idep(this.es).subscribe((data) => {
      this.user=data
      this.Listar();
      console.log(this.id,this.user.idep)
      this.convocatoriaservice.listar_vacante(this.id,this.user.idep).subscribe(data => {
        this.vacante=data['VACANTES'] as number;
    })
    })
    this.listarep()
    
  }
  listarep(){
    this.escuelaService.ListAllEp().subscribe((data) => {
      this.listaep=data['LIST_EP']
      console.log(data)
      console.log(this.listaep)
    })
  }
  mostrar_subebaja(){
    if(this.rol == "ROLE_SECRETARY"){
      Swal.fire('Alerta','Usted no puede modificar este Campo');
    }else{
      this.vacan=true;
    this.lapiz=false
    this.check=true
    }
    

  }
  ocultar_subebaja(){
    this.vacan=false;
    this.lapiz=true
    this.check=false
    console.log(this.id+"-e"+this.user.idep+"-v"+this.vacante)
    this.convocatoriaservice.actualizar_vacante(this.id,this.user.idep,this.vacante).subscribe(data=>{
        console.log(data)
    })
  }
  Listar() {
    
    if (this.rol == "ROLE_SECRETARY") {
      
      this.vengo=false;
      this.escul=true;
      this.home=false;
      
    } else {
      this.vengo=false;
      this.home=true;
      this.convocatoriaservice.buscarDetConvocatoria(this.id, 2, this.user.idep).subscribe(
        (data) =>{
  
          this.convocatorias=data["DETALLE_CONVOCATORIA"];
          console.log(this.convocatorias);
        },(error)=>{
          alert("OCURRIO UN ERROR "+error);
        }
      )
    }
    
  }
  detalle_escuela(id:number){
    this.vengo=false;
      this.escul=false;
      this.home=true;
      this.convocatoriaservice.buscarDetConvocatoria(this.id, 2, id).subscribe(
        (data) =>{
  
          this.convocatorias=data["DETALLE_CONVOCATORIA"];
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
    this.detconv=detconv;
    
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
  open2(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
  subebaja(operacion:string){
    console.log(operacion)
    if (operacion == "+") {
        this.vacante ++
    } else {
        this.vacante --
    }
  }
}
