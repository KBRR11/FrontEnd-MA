import { Component, OnInit } from '@angular/core';
import { Personas } from "src/app/Modelo/Personas";
import { PersonasService } from "src/app/service/personas.service";
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register-per',
  templateUrl: './register-per.component.html',
  styleUrls: ['./register-per.component.scss']
})
export class RegisterPerComponent implements OnInit {
  persona:Personas = new Personas();
  constructor(private personasService:PersonasService, private router:Router ){ }

  ngOnInit() {
    this.terminarProceso();
  }

  addpersona (persona:Personas){ 
    
    let nombres= (<HTMLInputElement>document.getElementById("nombres")).value;
    let apellidos = (<HTMLInputElement>document.getElementById("apellidos")).value;
    let t_documento = (<HTMLInputElement>document.getElementById("t_doc")).value;
    let n_documento = (<HTMLInputElement>document.getElementById("docid")).value;
    let correo=(<HTMLInputElement>document.getElementById("correo")).value;
    let telefono=(<HTMLInputElement>document.getElementById("telefono")).value;
    let direccion=(<HTMLInputElement>document.getElementById("direcc")).value;
    
   



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
     if(localStorage.length!=0){
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
           
         this.router.navigate(['/register-user']);
           
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
          this.router.navigate(['/register-user']);
        }
      })
    }else{
      this.router.navigate(['/login']);
    }
  }

}
