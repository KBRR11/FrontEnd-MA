import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from 'src/app/service/login.service'
import { Observable, throwError } from 'rxjs';
import { Requisito } from '../../Modelo/Requisito';
import { Convenio } from '../../Modelo/Convenio';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Requisito_Convenio } from 'src/app/Modelo/Requisito_Convenio';
import { format } from 'path';

@Injectable({
  providedIn: 'root'
})
export class RequisitoService {
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  headers: Headers;
  constructor(private http:HttpClient, private loginService: LoginService, private router: Router) { 
    this.headers = new Headers();
    this.headers.set('Content-Type', 'multipart/form-data');
  }
  ////requisito='http://localhost:8090/';  

  private Autorization(){

    let token= this.loginService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer'+token);
    }
  }

  getRequisito():Observable<Requisito[]>{
    return this.http.get<Requisito[]>(`${environment.apiUrl}/api/requisitos`,{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    }));
    /*
    return this.http.get<Requisito[]>(`${environment.apiUrl}/api/requisitos`,{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    }));
     */
  }

  getRequisitoId(idrequisito:number):Observable<Requisito>{
    return this.http.get<Requisito>(`${environment.apiUrl}/api/requisitos/`+idrequisito,{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    }));
  }


  createRequisito(requisito:Requisito,archivo:File){
    const form = new FormData();
    form.append("archivo",archivo);
    form.append("nombre",requisito.nombre);
    console.log("service",requisito)
    console.log("service",archivo)
    return this.http.post(`${environment.apiUrl}/api/requisito/create`,form);
  }

  VincularConvenioRequisito(requisisto_Convenio:Requisito_Convenio){
    console.log("service vincular requisito", requisisto_Convenio);
    return this.http.post<Requisito_Convenio[]>(`${environment.apiUrl}/api/requisitos_convenio/add`,requisisto_Convenio,{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    }));
  }

  updateRequisito(requisito:Requisito){
    return this.http.put<Requisito>(`${environment.apiUrl}/api/requisitos/upd/`+requisito.idrequisitos,requisito,{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    }));
  }

  DeleteNoRequisito(requisito:Requisito):Observable<Requisito[]>{
    console.log('hola estamos en delete'+requisito.idrequisito_convenio);
    return this.http.delete<Requisito[]>(`${environment.apiUrl}/api/requisitos/del/`+requisito.idrequisito_convenio,{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    }));
  }

  getConvenios():Observable<Convenio[]>{
    return this.http.get<Convenio[]>(`${environment.apiUrl}/api/convenios/`,{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    }));

    /*
    return this.http.get<Convenio[]>(`${environment.apiUrl}/api/convenios`,{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    }));
     */
  }

  getReqConve(idconvenio:number):Observable<Requisito[]>{
    console.log("servicio"+idconvenio);
    return this.http.get<Requisito[]>(`${environment.apiUrl}/api/requisitos/convenio/`+idconvenio+'/1',{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    }));
  }

  getReqConve2(idconvenio:number):Observable<Requisito[]>{
    console.log("servicio"+idconvenio);
    return this.http.get<Requisito[]>(`${environment.apiUrl}/api/requisitos/convenio/`+idconvenio+'/0',{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    }));
  }

  getReqConveDiferente(idconvenio:number):Observable<Requisito[]>{
    console.log("servicio"+idconvenio);
    return this.http.get<Requisito[]>(`${environment.apiUrl}/api/requisitos/convenio2/`+idconvenio+'/1',{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    }));
  }
  uploadArchivo(archivo: File, id, idr,tipo:number): any{
    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    formData.append("idr", idr)
    return this.http.post(`${environment.apiUrl}/upload/`+ tipo, formData)
  }

  crearArchivo(archivo: File, id,tipo:number): any{
    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    return this.http.post(`${environment.apiUrl}/upload/create/`+ tipo, formData)
  }
}
