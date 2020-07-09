import { Component, OnInit } from '@angular/core';
import { Convocatoria } from 'src/app/Modelo/Convocatoria';
import { ConvocatoriaService } from 'src/app/service/convocatoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-convocatoria-crud',
  templateUrl: './convocatoria-crud.component.html',
  styleUrls: ['./convocatoria-crud.component.scss']
})
export class ConvocatoriaCRUDComponent implements OnInit {
  listaconvocatorias:Convocatoria[]=[]
  constructor(private convocatoriaservice:ConvocatoriaService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }
  listar(){
    this.convocatoriaservice.listaConvocatoria().subscribe((data)=>{
      console.log(data["LIST_CONVOCATORIA"])
      this.listaconvocatorias=data["LIST_CONVOCATORIA"]
    })
  }
  detalleconv(id:number){
    localStorage.setItem("idconvocaotria" , ""+id);
    alert(localStorage.getItem("idconvocaotria"))
    this.router.navigate(['detalleconv']);
  }
}
