import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Personas } from "src/app/Modelo/Personas";
import { LoginService } from "src/app/service/login.service";
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
  })
  export class PersonasService {
  
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
    constructor(private http:HttpClient, private router:Router, private loginService:LoginService) { }
  
    private agregarAutorizacion(){
      let token = this.loginService.token;
      if(token!=null){
        //console.log("ESTE ES EL TOKEN "+token);
        return this.httpHeaders.append('Authorization','Bearer' + token);
      }
      
      return this.httpHeaders;
    }
  
    crearPersona(persona:Personas){
      return this.http.post<Personas>(`${ environment.apiUrl }/personas/add`,persona,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
       // Swal.fire('Registro Exitoso !!','Listo '+persona.nombre1+', ahora crea tu usuario.', 'success',);
        return throwError(e);
      }))
    }
  
  }