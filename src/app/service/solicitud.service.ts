import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginService } from "src/app/service/login.service";
import Swal from 'sweetalert2';
import { Solicitud} from '../Modelo/Solicitud';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

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

  crearSolicitud(solicitud:Solicitud){
    return this.http.post<Solicitud>(`${ environment.apiUrl }/api/solicitud/add`,solicitud,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
        
         return throwError(e);
       }))
  }
  getSolicitud(idu:number, idc:number){
    return this.http.get<Solicitud>(`${ environment.apiUrl }/api/solicitud/`+idu+`/`+idc,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
      return throwError(e);
    }))
  }
}
