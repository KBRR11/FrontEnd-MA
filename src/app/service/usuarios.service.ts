import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from "src/app/service/login.service";
import { Usuarios, Usuario } from "src/app/Modelo/Usuarios";
import { Rol} from "src/app/Modelo/Rol";
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

      //////////new inter////////////////////777
      getUser(){
        return this.http.get<Usuario>(`${ environment.apiUrl }/api/listar`,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
          return throwError(e);
        }))
      }
      getUserID(iduser: number){
        return this.http.get<Usuario>(`${ environment.apiUrl }/api/listar/`+ iduser,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
          return throwError(e);
        }))
      }

      crearUser(usuario:Usuario){
        return this.http.post<Usuario>(`${ environment.apiUrl }/api/add_user`,usuario,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
             return throwError(e);
           }))
      }

      modificaUser(usuario:Usuario){
        return this.http.put<Usuario>(`${ environment.apiUrl }/api/update/`+usuario.idusuario,usuario,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
          return throwError(e);
        }))
      }

      deleteUser(iduser:number){
        return this.http.get<Usuario>(`${ environment.apiUrl }/api/delete/`+ iduser,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
          return throwError(e);
        }))
      }

      getrol(){
        return this.http.get<Rol>(`${ environment.apiUrl }/api/rol`,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
          return throwError(e);
        }))
      }

      getrolId(idrol:number){
        return this.http.get<Rol>(`${ environment.apiUrl }/api/rol/`+idrol,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
          return throwError(e);
        }))
      }

      eliminar(id:number){
        return this.http.delete<Usuario>(`${ environment.apiUrl }/api/delete/`+id,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
          return throwError(e);
        }))
      }

    }