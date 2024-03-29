import { Component, OnInit } from '@angular/core';
import { Usuarios } from "src/app/Modelo/Usuarios";
import { Facultades } from "src/app/Modelo/Facultades";
import { FacultadesService } from "src/app/service/facultades.service";
import { EpService } from "src/app/service/Ep.service";
import { LoginService } from 'src/app/service/login.service';
import { Ep } from "src/app/Modelo/EP";
import Swal from 'sweetalert2';

import { Router } from '@angular/router'
@Component({
  selector: 'app-datos-academicos',
  templateUrl: './datos-academicos.component.html',
  styleUrls: ['./datos-academicos.component.scss']
})
export class DatosAcademicosComponent implements OnInit {
usuario : Usuarios = new Usuarios();
facultad: Facultades[]=[];

ep: Ep = new Ep();
epResult :Ep[]=[];
estudiante:boolean = false;
  constructor(private facultadService:FacultadesService, private epService:EpService, private router:Router, private loginService:LoginService ) { }

  ngOnInit(): void {
    //console.log(localStorage);
    this.iniciarProceso();
   this.facultadService.getAllFacultades().subscribe((data) =>{
     this.facultad = data['LIST_FACULTADES'];
   })
   let datosusu = JSON.parse(sessionStorage.getItem("personas"));
    if(this.loginService.isAuthenticated()==true){
      Swal.fire('Login','Hola '+ datosusu.nombres +' ya estas Autentificado', 'info');
      this.router.navigate(['/dashboard']);
      
    }
  }
   datos = JSON.parse(localStorage.getItem("registerper"));
   validateCode(event){
if (this.usuario.tipo==1 && event.length>9) {
  Swal.fire({
    icon: 'warning',
    title: 'Advertencia:',
    text: 'El código universitario consta de 9 dígitos.',
    
  })
}
   }
  updateTipo(){
    
    if(this.usuario.tipo==1){
      this.estudiante=true;
          }else{
            this.estudiante=false;
          }
  }

  ObtenerIdfac(){
//console.log(this.ep.IDFACULTAD);

this.epService.getEpforId(this.ep.IDFACULTAD).subscribe(
  (data) => {
    this.epResult = data['EP'];
   //console.log(this.epResult);
  });
  }
  
  adddatAcademic(){
    
  if(this.usuario.tipo==null && (this.usuario.sede && this.usuario.idep) ==null){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Hay datos Importantes que no llenaste',
      
    })
  }else{
    if (this.usuario.tipo==1 && (this.usuario.codigo && this.usuario.ciclo && this.usuario.sede && this.usuario.idep) ==null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hay datos Importantes que no llenaste',
        
      })
    }else{
      if (this.usuario.tipo==2 && (this.usuario.sede && this.usuario.idep) ==null) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hay datos Importantes que no llenaste',
          
        })
    }else{
      
      if (this.usuario.tipo==1 &&(this.usuario.codigo && this.usuario.ciclo && this.usuario.sede && this.usuario.idep) !=null) {
        localStorage.setItem('Tipo',JSON.stringify(this.usuario.tipo));
        localStorage.setItem('Sede',JSON.stringify(this.usuario.sede));
        localStorage.setItem('Ep',JSON.stringify(this.usuario.idep));
        localStorage.setItem('Ciclo',JSON.stringify(this.usuario.ciclo));
        localStorage.setItem('Codigo',JSON.stringify(this.usuario.codigo));
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso!',
          text: 'Ya casi terminas '+this.datos.nombres+', ahora crea un Usuario ',
          confirmButtonText:'Continuar'
        })
        this.router.navigate(['/register-user']);
        //console.log(localStorage);
        }else{
          if (this.usuario.tipo==2 && (this.usuario.sede && this.usuario.idep) !=null ) {
            localStorage.setItem('Tipo',JSON.stringify(this.usuario.tipo));
          localStorage.setItem('Sede',JSON.stringify(this.usuario.sede));
          localStorage.setItem('Ep',JSON.stringify(this.usuario.idep));
          Swal.fire({
            icon: 'success',
            title: 'Registro Exitoso!',
            text: 'Ya casi terminas '+this.datos.nombres+', ahora crea un Usuario ',
            confirmButtonText:'Continuar'
          })
          this.router.navigate(['/register-user']);
          //console.log(localStorage);
          }
        }
    
     } 
    }
    
  }
  
  
}

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
    if(localStorage.getItem("Ep")!=null){
      Swal.fire({
        icon: 'info',
        title: 'Termina tu Proceso',
        text: 'Para evitar que tu proceso se borre, Porfavor Terminalo',
        confirmButtonText: "Entiendo"
        
      }).then((result) => {
        if (result.value) {
          
        this.router.navigate(['/register-user']);
          
        }
      })
    }
  }
}

}
