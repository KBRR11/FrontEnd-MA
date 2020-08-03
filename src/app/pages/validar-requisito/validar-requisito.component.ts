import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GanadoresService } from 'src/app/service/ganadores.service';
import { Ganador} from 'src/app/Modelo/Ganador';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { ConvocatoriaService } from "src/app/service/convocatoria.service";
import { Convocatoria } from 'src/app/Modelo/Convocatoria';
import { SolicitudService } from 'src/app/service/solicitud.service';
import { Ep } from 'src/app/Modelo/EP';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validar-requisito',
  templateUrl: './validar-requisito.component.html',
  styleUrls: ['./validar-requisito.component.scss']
})
export class ValidarRequisitoComponent implements OnInit {
  title: string = "Participantes Ganadores"
  ganadores:Ganador[]=[];
  convocatorias: Convocatoria[]=[]
  escuela: Ep[]=[]
  iduser:number = Number(localStorage.getItem("idu"))
  idescuela: number
  idc: number
  ide: number
  constructor(private soliService: SolicitudService ,private convoService: ConvocatoriaService ,private ganadorService: GanadoresService, private usuarioService: UsuariosService ,private router:Router) { }

  ngOnInit(): void {
    this.listar_Convo()
    this.listar_ides()
    this.listar_escuela()
    
  }
  listar_ides(){
    this.usuarioService.listar_idescuela(this.iduser).subscribe((data) =>{
        this.idescuela=data['P_USUARIO']
        console.log(this.idescuela)
    })
  }
  listar_Convo(){
    this.convoService.listaConvocatoria(2).subscribe((data)=>{
      console.log(data["LIST_CONVOCATORIA"])
      this.convocatorias=data["LIST_CONVOCATORIA"]
      
    })
  }
  listar_escuela(){
    console.log(this.idc)
    this.soliService.secreuni(this.idc).subscribe(data=>{
        this.escuela=data['UNIVERSIDADES']
        console.log(this.escuela)
    })
  }
  listar_win(){
    this.ganadorService.getGanadorEscuela(this.idc,this.ide).subscribe(data =>{
      this.ganadores=data['GANADORES']
      console.log(this.ganadores)
    })
  }
  correo(win: any){
    Swal.fire(
      'Usuario Seleccionado!',
      'Enviale la confimacion por correo dale click: '+`<a href=https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${win.CORREO}&su=Movilidad+Académica&body=Hola+${win.NOMBRES.split(' ').join('+')},+usted+ha+sido+elegido+para+viajar+a+la+universidad+de+${win.NOM_UNIVERSIDAD}+.+Felicitaciones+,+Por+favor+acercarse+a+su+escuela.&tf=1 target='_blank'>`+win.CORREO+`</a>`,
      'success'
    )
  }
}
