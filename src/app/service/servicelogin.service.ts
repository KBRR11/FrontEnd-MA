import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SeviceloginService {

    constructor(private http: HttpClient, private router: Router) { }
     private isNoAutorizado(e): boolean{
      if(e.status==401 || e.status==403){
          
        this.router.navigate(['/login'])
        Swal.fire('Error Login','Username o Password incorrectos');
        return true;
      }
      
      return false;
    }
  }