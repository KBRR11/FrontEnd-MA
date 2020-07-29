import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/Modelo/Usuarios';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/service/login.service';
import { SeviceloginService } from 'src/app/service/servicelogin.service';
import { Session } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuarios : Usuarios;

  constructor(private loginService:LoginService ,private router:Router, private serviceLoginService:SeviceloginService) { 
    this.usuarios = new Usuarios();
  }

  ngOnInit(): void {
    
    let datosusu = JSON.parse(sessionStorage.getItem("personas"));
    if(this.loginService.isAuthenticated()==true){
      Swal.fire('Login','Hola '+ datosusu.nombres +' ya estas Autentificado', 'info');
      this.router.navigate(['/dashboard']);
      
    }else{
      localStorage.clear();
      sessionStorage.clear();
      //console.log("este es el local storage: " + localStorage.length);
    }

  }

  

  login():void{
    // console.log(this.usuarios.usuario);
     localStorage.setItem("user", this.usuarios.usuario)
     //console.log(localStorage.getItem("user"));
     if(this.usuarios.usuario==null || this.usuarios.password==null){
       Swal.fire('Error Login','Username o Password incorrectos','error');
       
       return;
     } 
     this.loginService.login(this.usuarios).subscribe(response=>{
       
        let datos = JSON.parse(atob(response.access_token.split(".")[1]));
       // console.log(datos);
        //console.log(response);
        
        this.loginService.guardarUsuario(response.access_token);
        this.loginService.guardarToken(response.access_token);
        //let usuario = this.loginService.personas;
        
        this.loginService.guardarUsuario(response.access_token)
        this.router.navigate(['/dashboard']);
        Swal.fire('login', 'Bienvenido: '+datos.NOMBRES+' has iniciado Sesión con éxito..!','success');
        
        
      }, error =>{
        if(error.status==401 || error.status==400){
          Swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
        }
      }
      );
    }

}
