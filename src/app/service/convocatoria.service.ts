import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Convocatoria,DetalleConvocatoria } from '../Modelo/Convocatoria';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Usuarios } from '../Modelo/Usuarios';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  usuario:Usuarios = new Usuarios();
  constructor(private http: HttpClient, private router: Router, private loginService:LoginService) { }
  //listar convocatoria
  private agregarAutorizacion(){
    let token = this.loginService.token;
    if(token!=null){
      //console.log("ESTE ES EL TOKEN "+token);
      return this.httpHeaders.append('Authorization','Bearer' + token);
    }
    
    return this.httpHeaders;
  }
  /////////////CONVOCATORIA/////////////
  listaConvocatoria(): Observable<Convocatoria[]> {
    console.log("llegue aca");
    return this.http.get<Convocatoria[]>(`${environment.apiUrl}/api/convocatoria`,{headers: this.agregarAutorizacion()})
                    .pipe(catchError(this.handlerError));
  }
  //actualizar convocatoria
  actualizarConvocatoria(convocatoria:Convocatoria) {
    return this.http.put<Convocatoria>(`${environment.apiUrl}/api/convocatoria/upd/`+convocatoria.idconvocatoria,convocatoria,{headers: this.agregarAutorizacion()})
                    .pipe(catchError(this.handlerError));
  }
  //crear convocatoria
  crearConvocatoria(convocatoria:Convocatoria) {
    return this.http.post<Convocatoria>(`${environment.apiUrl}/api/convocatoria/add`,convocatoria,{headers: this.agregarAutorizacion()})
                    .pipe(catchError(this.handlerError));
  }
  //buscar convocatoria
  buscarConvocatoria(idconvocatoria:number): Observable<Convocatoria> {
    return this.http.get<Convocatoria>(`${environment.apiUrl}/api/convocatoria/`+idconvocatoria,{headers: this.agregarAutorizacion()})
                    .pipe(catchError(this.handlerError));
  }
  //buscar convocatoria
  eliminarConvocatoria(idconvocatoria:number) {
    return this.http.delete<Convocatoria>(`${environment.apiUrl}/api/convocatoria/del/`+idconvocatoria,{headers: this.agregarAutorizacion()})
                    .pipe(catchError(this.handlerError));
  }
  /////////////DETALLE CONVOCATORIA/////////////
  
  //actualizar convocatoria
  actualizarDetConvocatoria(detalleconvocatoria:DetalleConvocatoria) {
    return this.http.put<DetalleConvocatoria>(`${environment.apiUrl}/api/detconvocatoria/upd/`+detalleconvocatoria.idetalle_convocatoria,detalleconvocatoria,{headers: this.agregarAutorizacion()})
                    .pipe(catchError(this.handlerError));
  }
  //crear convocatoria
  crearDetConvocatoria(convocatoria:DetalleConvocatoria) {
    return this.http.post<DetalleConvocatoria>(`${environment.apiUrl}/api/detconvocatoria/add`,convocatoria,{headers: this.agregarAutorizacion()})
                    .pipe(catchError(this.handlerError));
  }
  //buscar convocatoria
  buscarDetConvocatoria(idconvocatoria:number): Observable<DetalleConvocatoria> {
    return this.http.get<DetalleConvocatoria>(`${environment.apiUrl}/api/detconvocatoria/`+idconvocatoria,{headers: this.agregarAutorizacion()})
                    .pipe(catchError(this.handlerError));
  }
  //buscar convocatoria
  eliminarDetConvocatoria(idconvocatoria:number) {
    return this.http.delete<DetalleConvocatoria>(`${environment.apiUrl}/api/detconvocatoria/del/`+idconvocatoria,{headers: this.agregarAutorizacion()})
                    .pipe(catchError(this.handlerError));
  }
  //buscar alumno by convocatoria
  buscarAlumnoDetConvocatoria(idconvocatoria:number): Observable<DetalleConvocatoria> {
    return this.http.get<DetalleConvocatoria>(`${environment.apiUrl}/api/detconvocatoria/alum/`+idconvocatoria,{headers: this.agregarAutorizacion()})
                    .pipe(catchError(this.handlerError));
  }
  private handlerError( error ) {
    return throwError(error.message || "Server Error")
  }
}
