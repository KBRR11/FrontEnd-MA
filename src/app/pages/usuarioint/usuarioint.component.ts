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
import Swal from 'sweetalert2';


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
  espro: boolean=false;

  ciclo: string;
  codigo: string;

  constructor(private facultadService:FacultadesService , private persService:PersonasService, private epService:EpService, private userService:UsuariosService, private router:Router) { }

  ngOnInit(): void {
    this.getuser();
    this.getpersona();
    this.getEscuela();
    this.getFacultad();
    this.getRol();
    
    
  }

  met_tipo(t: number){
    if(t==1){
      this.tipo=true;
      this.tipoc=true
    }
    if(t!=1){
      this.tipo=false
      this.tipoc=false
    }
    if(t==6 || t==3){
      this.espro=true
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
        if(this.user.tipo==2 || this.user.tipo==3){
          this.user.ciclo="";
          this.user.codigo=""
        }
        console.log(this.user.codigo + " " + this.user.ciclo)
        this.userService.crearUser(this.user).subscribe((data) => {
          console.log(data);
          this.getuser();
        })
        
      }
    })
    this.ocultar_crear()
    Swal.fire('Usuario', '' + '' + 'Usuario registrado con éxito...!','success')
   }
   limpiar(te: number){
     console.log(te);
     if(te==2 || te==3){
      this.ciclo="";
      this.codigo="";
     }
   }
   modificarUser(user: Usuario){
    if(user.tipo==2 || user.tipo==3){
      user.ciclo="";
      user.codigo=""
    }
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
    Swal.fire('Usuario', '' + '' + 'Usuario modificado con éxito...!','success')
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
    Swal.fire('Usuario', '' + '' + 'Usuario eliminado con éxito...!','success')
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
