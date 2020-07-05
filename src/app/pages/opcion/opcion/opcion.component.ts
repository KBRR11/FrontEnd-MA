import { Component, OnInit } from '@angular/core';
import { OpcionService } from 'src/app/service/opcionService/opcion.service';
import { Opcion } from 'src/app/Modelo/Opcion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opcion',
  templateUrl: './opcion.component.html',
  styleUrls: ['./opcion.component.scss']
})
export class OpcionComponent implements OnInit {
  show:boolean = true;
  listOpcion: Opcion[]=[];
  constructor(private service:OpcionService ,private router:Router) { }

  ngOnInit() {
    /*this.service.getOpcion().subscribe((data)=>{
      console.log(data);
     // this.listOpcion = data['LIST_OPCION']
    })*/
  }
  
}
