import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from 'src/app/service/login.service'
import { Observable, throwError } from 'rxjs';
import { Requisito } from '../../Modelo/Requisito';
import { Convenio } from '../../Modelo/Convenio';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequisitoService {
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http:HttpClient, private loginService: LoginService) { }
  requisito='http://localhost:8090/';
  convenios='http://localhost:8090/';

  private Autorization(){
    let token= this.loginService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer'+token);
    }
  }

  getRequisito():Observable<Requisito[]>{
    return this.http.get<Requisito[]>(this.requisito+'api/requisitos',{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    }));
    /*
    return this.http.get<Requisito[]>(`${environment.apiUrl}/api/requisitos`,{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    }));
     */
  }

  getRequisitoId(idrequisito:number):Observable<Requisito>{
    return this.http.get<Requisito>(`${environment.apiUrl}/api/requisitos`+idrequisito,{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    }));
  }

  createRequisito(requisito:Requisito){
    console.log("service",requisito)
    return this.http.post<Requisito[]>(this.convenios+'api/requisitos/add',requisito,{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    }));
  }

  updateRequisito(requisito:Requisito){
    return this.http.put<Requisito>(`${environment.apiUrl}/api/requisitos/upd/`+requisito.idrequisito+requisito,{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    }));
  }

  DeleteNoRequisito(idrequisito:number){
    return this.http.delete<Requisito>(`${environment.apiUrl}/api/requisitos/del/`+idrequisito,{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    }));
  }

  getConvenios():Observable<Convenio[]>{
    return this.http.get<Convenio[]>(this.convenios+'api/convenios',{headers: this.Autorization()}).pipe(catchError(e =>{
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
    return this.http.get<Requisito[]>(this.convenios+'api/requisitos/convenio/'+idconvenio,{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    }));
  }
}
