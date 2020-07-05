import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Opcion } from '../../Modelo/Opcion';

@Injectable({
  providedIn: 'root'
})
export class OpcionService {

  constructor(private http:HttpClient) {   }
  opcion='http://localhost:8090/opcion/';
  
  
  getOpcion(): Observable<Opcion[]>{
    return this.http.get<Opcion[]>(this.opcion);
  }
}
