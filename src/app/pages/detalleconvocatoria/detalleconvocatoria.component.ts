import { Component, OnInit, ɵConsole } from '@angular/core';
import { Convocatoria,DetalleConvocatoria } from "src/app/Modelo/Convocatoria";
import { ConvocatoriaService } from "src/app/service/convocatoria.service";
import { Ep } from 'src/app/Modelo/EP';
import { EpService } from 'src/app/service/Ep.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { GanadoresService } from 'src/app/service/ganadores.service';
import { Usuario } from 'src/app/Modelo/Usuarios';
import Swal from 'sweetalert2';
import { Ganador } from 'src/app/Modelo/Ganador';



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
  seleccionados: number []=[];
  ganador: Ganador = new Ganador();
  user: Usuario;

  vengo: boolean=false
  home:boolean=true
  escul:boolean=false
  vacan:boolean=false
  lapiz:boolean=true
  check:boolean=false
  quitar: boolean=true
  poner: boolean=true
  cheee:boolean =false;
  rol: string = localStorage.getItem("rol")
  es:number = Number(localStorage.getItem("idu"))
  vacante:number = 0
  cont_seleccionados:number=0
  id_det_conv: number
  constructor(private ganadorService:GanadoresService, private escuelaService:EpService,private convocatoriaservice:ConvocatoriaService,private epservice:EpService, private modalService: NgbModal) { }
  id:number = Number(localStorage.getItem("idconvocaotria"))
  ngOnInit(): void {
    
    this.convocatoriaservice.listaruser_idep(this.es).subscribe((data) => {
      this.user=data
      this.Listar();
      console.log(this.id,this.user.idep)
      if(this.rol!="ROLE_SECRETARY"){
      this.convocatoriaservice.listar_vacante(this.id,this.user.idep).subscribe(data => {
        this.vacante=data['VACANTES'] as number;
        this.cont_seleccionados=this.vacante
        console.log(this.cont_seleccionados)
    })}
    })
    
    this.listarep()
    
  }
  cambiar_seleccion(){
    this.quitar=true
    if (this.poner==false) {
      this.poner=true
      console.log("lle")
    }else{
      this.poner=false
    }
    
  }
  cambiar_seleccion2(){
    var chec = document.getElementById("selec")
    chec.spellcheck=true
    this.poner=true
    if (this.quitar==false) {
      this.quitar=true
    }else{
      this.quitar=false
      console.log("te")
    }
    
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
      this.convocatoriaservice.listar_vacante(this.id,id).subscribe(data => {
        this.vacante=data['VACANTES'] as number;
        this.cont_seleccionados=this.vacante
        console.log(this.cont_seleccionados)
    })
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
    this.cheee
    console.log("tutu: " + idconvocatoria)
      this.convocatoriaservice.buscarAlumnoDetConvocatoria(idconvocatoria).subscribe(
        (data)=>{
          this.alumno=data['CONVOCATORIA']
          console.log(data);
        },(error)=>{
          alert("OCURRIO UN ERROR "+error);
        }
      )
      
    this.id_det_conv=idconvocatoria  

    
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' });
    
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
  agregar_id(po: number){
    let varia: boolean = false;
    if(this.cont_seleccionados>=0){
      for (let index = 0; index < this.seleccionados.length; index++) {
        const element = this.seleccionados[index];
        if (element==po ) {
          varia = true;
          this.seleccionados.splice(index,1)
          break;
        }
      }
      if(!varia){
        this.seleccionados.push(po);
        this.cont_seleccionados-- 
  
      }
      console.log(this.seleccionados)
      console.log(this.cont_seleccionados)
      
    }else{
      Swal.fire('No hay vacantes', 'Aumente el numero de vacantes o deseleccione un participante', 'success');
    }
  }
    
  guardar_ganador(){
    
    for (let index = 0; index < this.seleccionados.length; index++) {

      this.ganador.idusuario = this.seleccionados[index];
      this.ganador.iddetalle_convocatoria=this.id_det_conv
      this.ganadorService.crearGanador(this.ganador).subscribe(data => {
        
      })
    }
    Swal.fire('Registro exitoso', 'Los participantes seleccionados se agregaron', 'success');
  }
  
  
}
