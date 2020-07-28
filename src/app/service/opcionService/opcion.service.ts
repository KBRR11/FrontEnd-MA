import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Opcion } from '../../Modelo/Opcion';
import { LoginService } from 'src/app/service/login.service'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OpcionService {
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http:HttpClient, private loginService: LoginService) {   }
  opcion='http://localhost:8090/api/opcion/';
  
  private Autorization(){
    let token= this.loginService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer'+token);
    }
  }
  
  getOpcion(): Observable<Opcion[]>{
    return this.http.get<Opcion[]>(this.opcion,{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    }));
  }
  CreateOpcion(opcion: Opcion){
    return this.http.post<Opcion[]>(this.opcion+'add',opcion,{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    }));
  }
  DeleteOpcion(opcion:Opcion):Observable<Opcion[]>{
    return this.http.delete<Opcion[]>(this.opcion+'delete/'+opcion.idopcion,{headers: this.Autorization()}).pipe(catchError(e =>{
      return throwError(e);
    }));
  }

  cargarOpciones(nom_rol:string){
return this.http.get<Opcion[]>(`${ environment.apiUrl }/api/opc/`+nom_rol,{headers: this.Autorization()}).pipe(catchError(e =>{
  return throwError(e);
}));

  }
}
