import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GanadoresService } from 'src/app/service/ganadores.service';
import { Ganador } from 'src/app/Modelo/Ganador';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { ConvocatoriaService } from "src/app/service/convocatoria.service";
import { Convocatoria } from 'src/app/Modelo/Convocatoria';

@Component({
  selector: 'app-validar-requisito',
  templateUrl: './validar-requisito.component.html',
  styleUrls: ['./validar-requisito.component.scss']
})
export class ValidarRequisitoComponent implements OnInit {
  title: string = "Participantes Ganadores"
  ganadores:Ganador[]=[];
  convocatorias: Convocatoria[]=[]
  iduser:number = Number(localStorage.getItem("idu"))
  idescuela: number
  idc: number
  constructor(private convoService: ConvocatoriaService ,private ganadorService: GanadoresService, private usuarioService: UsuariosService ,private router:Router) { }

  ngOnInit(): void {
    this.listar_Convo()
    this.listar_ides()
    
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
  listar_win(){
    this.ganadorService.getGanadorEscuela(1,this.idescuela).subscribe(data =>{

    })
  }
}
