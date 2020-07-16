import { Component, OnInit } from '@angular/core';
import { Usuario, Usuarios } from "src/app/Modelo/Usuarios";
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

  title: string = "Usuarios"

  /////////////////// Objetos y Arrays //////////////////////////////////
  user : Usuario = new Usuario();
  users : Usuario[] = [];

  persona : Persona = new Persona();
  personas : Persona[] = [];

  escuela : Ep = new Ep();
  escuelas : Ep[] = [];

  facultad : Facultades = new Facultades();
  facultades : Facultades[] = [];

  rol : Rol = new Rol();
  roles : Rol[] = [];

  modifica: boolean = false;
  crea: boolean = false;
  bori: boolean = true;
  header: boolean = true;
  tipo: boolean = true;
  tipoc: boolean = true;

  constructor(private facultadService:FacultadesService , private persService:PersonasService, private epService:EpService, private userService:UsuariosService, private router:Router) { }

  ngOnInit(): void {
    this.getEscuela();
    this.getFacultad();
    this.getRol();
    this.getpersona();
    this.getuser();
  }

  met_tipo(t: number){
    if(t==1){
      this.tipo=true;
      this.tipoc=true
    }
    if(t==2 || t==3){
      this.tipo=false
      this.tipoc=false
    }
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
  ocultar_modi(){
    this.modifica=false;
    this.bori=true;
    this.header=true;
  }
  getFacultad(){
    this.facultadService.getAllFacultades().subscribe(
      (data) =>{
      this.facultades = data['LIST_FACULTADES'];
        console.log(this.facultades);
    })
  }
  getEscuela(){
    this.epService.getEpforId(3).subscribe(
      (data) => {
        this.escuelas = data['EP'];
       console.log(this.escuelas);
      });
      }
  
  getRol(){
    this.userService.getrol().subscribe((data) =>{
      this.roles = data['ROL'];
      console.log(this.roles);
    })
  }

  getuser(){
    this.userService.getUser().subscribe((data) => {
      this.users = data['LIST_USER'];
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
    this.persService.crearPer(this.persona).subscribe((data) => {
      console.log(data)
      if (true) {
        const x = this.persona.n_documento;
        this.user.n_documento=x;
        this.userService.crearUser(this.user).subscribe((data) => {
          console.log(data);
        })
        this.getuser();
      }
    })
    this.ocultar_crear()
   }

   modificarUser(user: Usuario){
    console.log(user)
    this.userService.modificaUser(user).subscribe((data) => {
      console.log(data);
      this.persona.nombres=user.nombres;
      this.persona.apellidos=user.apellidos;
      this.persona.idpersona=user.idpersona;
      this.persona.n_documento=user.n_documento;
      this.persona.t_documento=user.t_documento;
      this.persona.direccion=user.direccion;
      this.persona.telefono=user.telefono;
      this.persona.correo=user.correo;
      console.log(this.persona)
      this.persService.modifiPer(this.persona).subscribe((data) =>{
        console.log(data)
        this.getuser();
      })  
    })
    this.ocultar_modi()
   }

   eliminiarUser(id:number){
    this.userService.eliminar(id).subscribe((data) =>{      
      this.userService.getUserID(id).subscribe((data) => {
        this.user = data['LIST_USER'][0];
        console.log(this.user);
        this.persService.deletePer(data['LIST_USER'][0].idpersona).subscribe((data) =>{
          this.getuser();
        });
      });
    });
   }

   loadUser(id:number){
    this.userService.getUserID(id).subscribe((data) => {
      this.user = data['LIST_USER'][0];
      console.log(this.user);
      this.persService.listarPerId(data['LIST_USER'][0].idpersona).subscribe((data) => {
        this.persona = data['P_CUR_PERSONAS'][0];
        console.log(this.persona);
      });
    });
    this.mostrar_modi()
   }

}
