import { Component, OnInit } from '@angular/core';
import { Personas } from "src/app/Modelo/Personas";
import { PersonasService } from "src/app/service/personas.service";
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register-per',
  templateUrl: './register-per.component.html',
  styleUrls: ['./register-per.component.scss']
})
export class RegisterPerComponent implements OnInit {
  persona:Personas = new Personas();
  constructor(private personasService:PersonasService, private router:Router,private loginService:LoginService  ){ }

  ngOnInit() {
    //console.log(localStorage);
    this.terminarProceso();
    let datosusu = JSON.parse(sessionStorage.getItem("personas"));
    if(this.loginService.isAuthenticated()==true){
      Swal.fire('Login','Hola '+ datosusu.nombres +' ya estas Autentificado', 'info');
      this.router.navigate(['/dashboard']);
      
    }
  }

  validateDoc(event){
   //console.log(this.persona.t_documento);
//console.log(event);
if (this.persona.t_documento == 1 && event.length>8) {
  Swal.fire({
    icon: 'warning',
    title: 'Advertencia:',
    text: 'El Dni solo puede tener 8 dígitos.',
    
  })
}else{
  if (this.persona.t_documento == 3 && event.length>9) {
    Swal.fire({
      icon: 'warning',
      title: 'Advertencia:',
      text: 'El Carnet de Extranjería solo puede tener 9 dígitos.',
      
    })
  }
}
  }

  validatePhone(event){
    if (event.length>9) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia:',
        text: 'El número de telefono solo puede tener 9 dígitos (PERÚ). EJEMPLO: (930471871) ',
        
      })
    }
  }

  addpersona (persona:Personas){ 
    
    let nombres= (<HTMLInputElement>document.getElementById("nombres")).value;
    let apellidos = (<HTMLInputElement>document.getElementById("apellidos")).value;
    let t_documento = (<HTMLInputElement>document.getElementById("t_doc")).value;
    let n_documento = (<HTMLInputElement>document.getElementById("docid")).value;
    let correo=(<HTMLInputElement>document.getElementById("correo")).value;
    let telefono=(<HTMLInputElement>document.getElementById("telefono")).value;
    let direccion=(<HTMLInputElement>document.getElementById("direcc")).value;
    
   
//console.log(n_documento);
//console.log(this.persona.n_documento);
if (t_documento=="1" && n_documento.length!=8) {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'El número de dígitos de DNI no es correcto',
    
  })
}else{
  if (t_documento=="3" && n_documento.length!=9) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El número de dígitos de Carnet de Extranjería no es correcto',
      
    })
  }else{ 
    if (telefono.length!=9) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El número de dígitos de telefono no es correcto',
        
      })
    }else{
if((this.persona.nombres && this.persona.apellidos && this.persona.t_documento
  && this.persona.n_documento && this.persona.correo && this.persona.telefono
   && this.persona.direccion) !=null ){
    
localStorage.setItem('registerper',JSON.stringify(this.persona));
   
   //console.log(localStorage);
    
    Swal.fire({
      icon: 'success',
      title: 'Registro Exitoso!',
      text: 'Listo '+this.persona.nombres+', ahora debes llenar información académica importante',
      confirmButtonText:'Continuar'
    })
    this.limpiar();
    this.router.navigate(['/datos-academicos']);

    
}else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Hay datos Importantes que no llenaste',
    
  })
 }
}
}
}
 
  }

  limpiar(){
(<HTMLInputElement>document.getElementById("nombres")).value="";
(<HTMLInputElement>document.getElementById("apellidos")).value="";
(<HTMLInputElement>document.getElementById("t_doc")).value="";
(<HTMLInputElement>document.getElementById("docid")).value="";
(<HTMLInputElement>document.getElementById("correo")).value="";
(<HTMLInputElement>document.getElementById("telefono")).value="";
(<HTMLInputElement>document.getElementById("direcc")).value="";
    
  }

  terminarProceso(){
    //console.log(localStorage);
     if(localStorage.getItem("registerper")!=null){
      (<HTMLInputElement>document.getElementById("nombres")).disabled=true;
      (<HTMLInputElement>document.getElementById("apellidos")).disabled=true;
      (<HTMLInputElement>document.getElementById("t_doc")).disabled=true;
      (<HTMLInputElement>document.getElementById("docid")).disabled=true;
      (<HTMLInputElement>document.getElementById("correo")).disabled=true;
      (<HTMLInputElement>document.getElementById("telefono")).disabled=true;
      (<HTMLInputElement>document.getElementById("direcc")).disabled=true;
       (<HTMLButtonElement>document.getElementById("continuar")).disabled=true;
       Swal.fire({
         icon: 'info',
         title: 'Termina tu Proceso',
         text: 'Para evitar perder tu progreso, Porfavor terminalo',
         confirmButtonText: "Entiendo"
         
       }).then((result) => {
         if (result.value) {
           
          if(localStorage.getItem("Tipo")===null){
            this.router.navigate(['/datos-academicos']);
          }else{
            if (localStorage.getItem("Tipo")!=null) {
              this.router.navigate(['/register-user']);
            }
          }
           
         }
       });
 
       
     }
     
     
   }

   advertencia(){
    if(localStorage.length!=0){
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Es posible que tu progreso no se guarde. ¿estas seguro de volver?',
        confirmButtonText: "Si, Volver",
        showCancelButton: true,
        cancelButtonText: "Continuar Proceso",
        cancelButtonColor:"#F9B80B"

      }).then((result) => {
        if (result.value) {
          
        this.router.navigate(['/login']);
          
        }else{
          if(localStorage.getItem("Tipo")===null){
          this.router.navigate(['/datos-academicos']);
        }else{
          if (localStorage.getItem("Tipo")!=null) {
            this.router.navigate(['/register-user']);
          }
        }
        }
      })
    }else{
      this.router.navigate(['/login']);
    }
  }

}
