import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginService } from "src/app/service/login.service";
import Swal from 'sweetalert2';
import { Ganador} from '../Modelo/Ganador';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GanadoresService {

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

  crearGanador(win :Ganador){
    return this.http.post<Ganador>(`${ environment.apiUrl }/api/ganador/add`,win,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
        
         return throwError(e);
       }))
  }
  modificarGanador(win:Ganador){
    return this.http.put<Ganador>(`${ environment.apiUrl }/api/ganador/`+win.idganador,win,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
      // Swal.fire('Registro Exitoso !!','Listo '+persona.nombre1+', ahora crea tu usuario.', 'success',);
       return throwError(e);
     }))
  }

  deleteGanador(idg:number){
    return this.http.delete<Ganador>(`${ environment.apiUrl }/api/ganador/`+idg,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
      // Swal.fire('Registro Exitoso !!','Listo '+persona.nombre1+', ahora crea tu usuario.', 'success',);
       return throwError(e);
     }))
  }
  getGanadorEscuela(idde:number, ide:number){
    return this.http.get<Ganador>(`${ environment.apiUrl }/api/ganador/listar/`+idde+`/`+ide,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
      return throwError(e);
    }))
  }
  getGanador(idde:number){
    return this.http.get<Ganador>(`${ environment.apiUrl }/api/ganador/`+idde,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
      return throwError(e);
    }))
  }
}
