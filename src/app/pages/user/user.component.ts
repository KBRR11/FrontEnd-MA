import { Component, OnInit } from "@angular/core";
import { Personas } from "src/app/Modelo/Personas";
import { Usuarios } from "src/app/Modelo/Usuarios";
import { UsuariosService } from "src/app/service/usuarios.service";
import Swal from 'sweetalert2';
@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {
  persona:Personas = new Personas();
  usuario : Usuarios = new Usuarios();
  constructor(private usuarioService:UsuariosService) {}

  ngOnInit() {
    this.DatosPersona();
  }
  DatosPersona(){
let datos = JSON.parse(sessionStorage.getItem("personas"));

this.usuarioService.DatosPersona(datos.idusuario).subscribe(
  (data) => {
    this.persona = data['LIST_USER'];
   console.log(this.persona);
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
