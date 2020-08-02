import { Component, OnInit } from '@angular/core';
import { Usuarios } from "src/app/Modelo/Usuarios";
import { UsuariosService } from "src/app/service/usuarios.service";
import { PersonasService } from "src/app/service/personas.service";
import { Personas } from "src/app/Modelo/Personas";
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUSERComponent implements OnInit {
  usuario:Usuarios = new Usuarios();
  persona:Personas = new Personas();
  constructor(private usuariosService:UsuariosService, private router:Router, private personasService:PersonasService, private loginService:LoginService) { }

  ngOnInit(): void {
    this.iniciarProceso();
    //console.log(localStorage);
    let datosusu = JSON.parse(sessionStorage.getItem("personas"));
    if(this.loginService.isAuthenticated()==true){
      Swal.fire('Login','Hola '+ datosusu.nombres +' ya estas Autentificado', 'info');
      this.router.navigate(['/dashboard']);
      
    }
    
  }


  addusuario(usuario:Usuarios){
    let datosus = JSON.parse(localStorage.getItem("registerper"));
    
    this.usuario.n_documento= datosus.n_documento;
    this.usuario.tipo=JSON.parse(localStorage.getItem("Tipo"));
    this.usuario.codigo=JSON.parse(localStorage.getItem("Codigo"));
    this.usuario.ciclo = JSON.parse(localStorage.getItem("Ciclo"));
    this.usuario.idep = JSON.parse(localStorage.getItem("Ep"));
    this.usuario.sede = JSON.parse(localStorage.getItem("Sede"));

   let pass1 = (<HTMLInputElement>document.getElementById("pass1")).value;
   let pass2 = (<HTMLInputElement>document.getElementById("pass2")).value;
   
  


   if(localStorage.length==0){
    Swal.fire({
      icon: 'error',
      title: 'Algo anda mal',
      text: 'tus datos fueron eliminados, Porfavor vuelve a intentar!',
      confirmButtonText:'Volver a Intentar'
    }).then((result) => {
      if (result.value) {
        
      this.router.navigate(['/register-per']);
        
      }
    })
    
   }else{
     if(pass2!=pass1){
      Swal.fire({
        icon: 'error',
        title: 'Algo anda mal',
        text: 'Las Contraseñas no coinciden!!',
        confirmButtonText:'Volver a Intentar'
      })
     }else{
       if (this.usuario.tipo==1) {
        this.addpersona();
       
        this.usuariosService.crearUsuarioEstudiante(usuario).subscribe(
          );
          Swal.fire({
            icon: 'success',
            title: 'Registro Exitoso!',
            text: 'Listo '+datosus.nombres+', en el transcurso de 30 min verificarán y activarán tu cuenta',
            confirmButtonText:'Continuar'
          })
          this.router.navigate(['/login']);
          localStorage.clear();
       }else{
         if (this.usuario.tipo==2) {
          this.addpersona();
       
          this.usuariosService.crearUsuarioDocente(usuario).subscribe(
            );
            Swal.fire({
              icon: 'success',
              title: 'Registro Exitoso!',
              text: 'Listo '+datosus.nombres+', en el transcurso de 30 min verificarán y activarán tu cuenta',
              confirmButtonText:'Continuar'
            })
            this.router.navigate(['/login']);
            localStorage.clear();
         }
       }
       
      
    }
   
   }

  }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  addpersona(){
    
    let datosper = JSON.parse(localStorage.getItem("registerper"));
    this.persona.nombres= datosper.nombres;
    this.persona.apellidos = datosper.apellidos;
    this.persona.t_documento = datosper.t_documento;
    this.persona.n_documento = datosper.n_documento;
    this.persona.correo = datosper.correo;
    this.persona.telefono = datosper.telefono;
    this.persona.direccion = datosper.direccion;
    

    
    this.personasService.crearPersona(this.persona).subscribe();

  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  iniciarProceso(){
    
    if(localStorage.getItem("registerper")===null){
      Swal.fire({
        icon: 'info',
        title: 'Inicia tu Proceso',
        text: 'Aún no has ingresado tus datos para comenzar, Porfavor llenalos',
        confirmButtonText: "Entiendo"
        
      }).then((result) => {
        if (result.value) {
          
        this.router.navigate(['/register-per']);
          
        }
      })
      
    }else{
      if(localStorage.getItem("Tipo")===null){
        Swal.fire({
          icon: 'info',
          title: 'Inicia tu Proceso',
          text: 'Aún no has ingresado tus datos Académicos, Porfavor llenalos',
          confirmButtonText: "Entiendo"
          
        }).then((result) => {
          if (result.value) {
            
          this.router.navigate(['/datos-academicos']);
            
          }
        })
        
      }
    }
    
    
  
}

}
