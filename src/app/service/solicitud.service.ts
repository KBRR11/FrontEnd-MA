import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginService } from "src/app/service/login.service";
import Swal from 'sweetalert2';
import { Solicitud} from '../Modelo/Solicitud';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Convocatoria, Universidades } from '../Modelo/Convocatoria';

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
  getSolicitudNidea(idu:number){
    return this.http.get<Solicitud>(`${ environment.apiUrl }/api/solicitud_requisitos/`+idu,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
      return throwError(e);
    }))
  }
  getSolicitud(idu:number){
    return this.http.get<Solicitud>(`${ environment.apiUrl }/api/readSolicitud_Convocatoria/`+idu,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
      return throwError(e);
    }))
  }

  Listar_Convactivas(idu:number){
    return this.http.get<Convocatoria>(`${ environment.apiUrl }/api/read_ConvaActiva/`+idu,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{   
      return throwError(e);
    }))
  }

  get_University(idu:number){
    return this.http.get<Universidades>(`${ environment.apiUrl }/api/listarUniversidad/`+idu,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{   
      return throwError(e);
    }))
  }

  getSolicitud_DetalleConvo(idu:number,iduni:number,idconvo:number){
    return this.http.get<Universidades>(`${ environment.apiUrl }/api/solicitud_deta_convo/`+idu+`/`+idconvo+`/`+iduni,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{   
      return throwError(e);
    }))
  }

  getReadSolicitud(idu:number){
    return this.http.get<Solicitud>(`${ environment.apiUrl }/api/readConv/`+idu,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{   
      return throwError(e);
    }))
  }

  createSolicitudArchivo(id,archivo:File){
    const form = new FormData();
    form.append("archivo",archivo);
    form.append("id",id);
    //form.append("asd",solicitud.idrequisito+"");
    console.log("service",id)
    console.log("service",archivo)
    return this.http.post(`${environment.apiUrl}/api/solicitud_requisitos/update`,form);
  }
  /** getConvenios():Observable<Convenio[]>{
    return this.http.get<Convenio[]>(this.requisito+'api/convenios',{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    })); */

  secreuni(idconvo:number){
    return this.http.get<Universidades>(`${ environment.apiUrl }/api/secre_uni/`+idconvo,{headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
      return throwError(e);
    }));
  }

  solicitudesdirect(idescu:number,idconvo:number){
    return this.http.get<Universidades>(`${ environment.apiUrl }/api/solicitudes_direc/`+idescu+`/`+idconvo,{headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
      return throwError(e);
    }));
  }
}