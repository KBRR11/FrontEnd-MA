import { Component, OnInit } from "@angular/core";
import { Personas } from "src/app/Modelo/Personas";
import { Usuarios } from "src/app/Modelo/Usuarios";
import { UsuariosService } from "src/app/service/usuarios.service";
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import Swal from 'sweetalert2';
import { ElementSchemaRegistry } from '@angular/compiler';
@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {
  persona:Personas = new Personas();
  usuario : Usuarios = new Usuarios();
  personadata : Personas[] = [];
  iduserFOTO : number;
  nombresPerfil: string;
  ocupacion:string;
  constructor(private usuarioService:UsuariosService , private router:Router ,private location:Location) {}

  ngOnInit() {
    this.DatosPersona();
    let userfoto = JSON.parse(sessionStorage.getItem("personas"));
    this.iduserFOTO = userfoto.idusuario;
    this.nombresPerfil= userfoto.nombres;
    this.ocupacion = userfoto.rol;
  }
  refresh(){
this.router.navigateByUrl("/dashboard", {skipLocationChange:true}).then(() => {
  //console.log(decodeURI(this.location.path()));
  this.router.navigate([decodeURI(this.location.path())]);
})
  }
  subirFoto(event){
//console.log(this.iduserFOTO);
//console.log(event);
this.usuarioService.updateFotoUser(event, this.iduserFOTO).subscribe(response=>{
  
  Swal.fire('Actualizado con éxito!!', 'la foto de perfil fue actualizada con exito','success');
  
 this.refresh();

}, error =>{
  if(error.status==404 || error.status==400 || error.status==500){
    Swal.fire('Error inesperado', 'Porfavor intentalo mas tarde', 'error');
  }
});

  }

  DatosPersona(){
let datos = JSON.parse(sessionStorage.getItem("personas"));

this.usuarioService.DatosPersona(datos.idusuario).subscribe(
  (data) => {
    this.personadata = data['LIST_USER'];
   //console.log(this.personadata);
  });
  }

  actualizarPass(){
    let password1 = (<HTMLInputElement>document.getElementById("pass1")).value;
    let password2 = (<HTMLInputElement>document.getElementById("pass2")).value;
    if (password2!=password1) {
      Swal.fire('Alerta', 'las contraseñas no coinciden','warning');
    }else{
    this.usuario.password=password2;
    this.usuarioService.updatePassword(password2).subscribe(response=>{
      Swal.fire('Contraseña Actualizada', 'la contraseña fue actualizada con exito','success');
    }, error =>{
      if(error.status==404 || error.status==400 || error.status==500){
        Swal.fire('Error inesperado', 'Porfavor intentalo mas tarde', 'error');
      }
    });

  }
  
  }

  updUsername(){
    let newUsername = (<HTMLInputElement>document.getElementById("username")).value;
    this.usuarioService.updateUsername(newUsername).subscribe(response=>{
      Swal.fire('Username Actualizado', 'ingresarás como: '+newUsername+ ' en tu próximo inicio de sesión.','success');
    }, error =>{
      if(error.status==404 || error.status==400 || error.status==500){
        Swal.fire('Error inesperado', 'Porfavor intentalo mas tarde', 'error');
      }
    });
  }
}
