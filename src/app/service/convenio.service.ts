import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginService } from "src/app/service/login.service";
import { Convenio } from '../Modelo/Convenio';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http:HttpClient, private router:Router, private loginService:LoginService) {
      
   }

   private agregarAutorizacion(){
    let token = this.loginService.token;
    if(token!=null){
      //console.log("ESTE ES EL TOKEN "+token);
      return this.httpHeaders.append('Authorization','Bearer' + token);
    }
    
    return this.httpHeaders;
 
  }
  getConvenioId(id:number){
    console.log(id);
    return this.http.get<Convenio[]>(`${ environment.apiUrl }/api/convenios/${ id }`,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
      return throwError(e);
    }));
  }
  getTodoCon(){
    return this.http.get<Convenio[]>(`${ environment.apiUrl }/api/convenios`,{headers: this.agregarAutorizacion()});
  }
  getConv_Uni(id: number){
    return this.http.get<Convenio[]>(`${ environment.apiUrl }/api/convenios/cursor/${ id }`,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
      return throwError(e);
    }));
  }

  getValidar(idc: number, idu){
    return this.http.get<String>(`${ environment.apiUrl }/api/convenios/${ idc }/${idu}`,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
      return throwError(e);
    }));
  }
}
