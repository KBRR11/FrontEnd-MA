import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ep } from "src/app/Modelo/EP";
import { LoginService } from "src/app/service/login.service";
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
  })
  export class EpService {

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
    

    getEpforId(idfacutad:number){
        console.log(idfacutad);
        return this.http.get<Ep[]>(`${ environment.apiUrl }/api/fac_ep/${ idfacutad }`);
    }
    ListAllEp(){
      return this.http.get<Ep[]>(`${ environment.apiUrl }/api/escuela/`,{headers: this.agregarAutorizacion()});
  }
    }