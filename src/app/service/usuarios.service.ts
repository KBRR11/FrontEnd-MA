import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from "src/app/service/login.service";
import { Usuarios } from "src/app/Modelo/Usuarios";
@Injectable({
    providedIn: 'root'
  })
  export class UsuariosService {
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
 usuario:Usuarios = new Usuarios();
    constructor(private http:HttpClient, private router:Router, private loginService:LoginService) { }

    private agregarAutorizacion(){
        let token = this.loginService.token;
        if(token!=null){
          
          return this.httpHeaders.append('Authorization','Bearer' + token);
        }
        
        return this.httpHeaders;
      }


      crearUsuarioEstudiante(usuario:Usuarios){
        return this.http.post<Usuarios>(`${ environment.apiUrl }/api/add_student`,usuario,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
             return throwError(e);
           }))
      }

      crearUsuarioDocente(usuario:Usuarios){
        return this.http.post<Usuarios>(`${ environment.apiUrl }/api/add_teacher`,usuario,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
             return throwError(e);
           }))
      }


      updateColores(usuario:Usuarios){
        let id = JSON.parse(sessionStorage.getItem("personas"));
  
    this.usuario.idusuario = id.idusuario;
        return this.http.put<Usuarios>(`${ environment.apiUrl }/api/upd/colores/`+this.usuario.idusuario,usuario,{headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
      
          return throwError(e);
        }));
      }
    }