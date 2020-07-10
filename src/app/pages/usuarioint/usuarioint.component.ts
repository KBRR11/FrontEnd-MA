import { Component, OnInit } from '@angular/core';
import { Usuario } from "src/app/Modelo/Usuarios";
import { positionElements } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { EpService } from "src/app/service/Ep.service";
import { Ep } from "src/app/Modelo/EP";
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { FacultadesService } from 'src/app/service/facultades.service';
import { Facultades } from 'src/app/Modelo/Facultades';
import { PersonasService } from 'src/app/service/personas.service';
import { Persona } from 'src/app/Modelo/Personas';
import { Rol } from 'src/app/Modelo/Rol';

@Component({
  selector: 'app-usuarioint',
  templateUrl: './usuarioint.component.html',
  styleUrls: ['./usuarioint.component.scss']
})
export class UsuariointComponent implements OnInit {

  user_cont: any[] = [{nombre: "Pele"}, {nombre: "Messi"}, {nombre: "Nick"}, {nombre: "Albert"}];
  title: string = "Usuarios"

  /////////////////// Objetos y Arrays //////////////////////////////////
  user : Usuario = new Usuario();
  users : Usuario[] = [];

  persona : Persona = new Persona();
  personas : Persona[] = [];

  escuela : Ep = new Ep();
  facultad : Facultades = new Facultades();
  rol : Rol = new Rol();

  modifica: boolean = false;
  crea: boolean = false;
  bori: boolean = true;
  header: boolean = true;

  constructor(private facultadService:FacultadesService , private persService:PersonasService, private epService:EpService, private userService:UsuariosService, private router:Router) { }

  ngOnInit(): void {
    this.getEscuela();
    this.getFacultad();
    this.getRol();
    this.getpersona();
    this.getuser();
  }


  mostrar_crear(){
    this.crea=true;
    this.bori=false;
    this.header=false;
  }
  ocultar_crear(){
    this.crea=false;
    this.bori=true;
    this.header=true;
  }

  mostrar_modi(){
    this.modifica=true;
    this.bori=false;
    this.header=false;
  }
  getFacultad(){
    this.facultadService.getAllFacultades().subscribe((data) =>{
      this.facultad = data['LIST_FACULTADES'];
    })
  }
  getEscuela(){
    this.epService.getEpforId(this.escuela.IDFACULTAD).subscribe(
      (data) => {
        this.escuela = data['EP'];
       console.log(this.escuela);
      });
      }
  
  getRol(){
    this.userService.getrol().subscribe((data) =>{
      this.rol = data['ROL'];
      console.log(this.rol);
    })
  }

  getuser(){
    this.userService.getUser().subscribe((data) => {
      this.users = data['(LIST_USER'];
      console.log(this.users);
    })
   }
   getpersona(){
     this.persService.listarPer().subscribe((data) => {
       this.personas = data['P_CURSOR'];
       console.log(this.personas)
     })
   }

   crearUser(){

   }
   modificarUser(){

   }
   eliminiarUser(){

   }

   loadPerson(id:number){
    this.persService.listarPerId(id).subscribe((data) => {
      this.personas = data['P_CURSOR'];
      console.log(data);
    })
   }
   loadUser(id:number){
    this.userService.getUserID(id).subscribe((data) => {
      this.users = data['LIST_USER'];
      console.log(data);
    })
   }

}
