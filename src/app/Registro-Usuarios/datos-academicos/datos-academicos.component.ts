import { Component, OnInit } from '@angular/core';
import { Usuarios } from "src/app/Modelo/Usuarios";
@Component({
  selector: 'app-datos-academicos',
  templateUrl: './datos-academicos.component.html',
  styleUrls: ['./datos-academicos.component.scss']
})
export class DatosAcademicosComponent implements OnInit {
usuario : Usuarios = new Usuarios();
estudiante:boolean = false;
  constructor() { }

  ngOnInit(): void {
   
  }

  updateTipo(){
    if(this.usuario.tipo==1){
      this.estudiante=true;
          }else{
            this.estudiante=false;
          }
  }


}
