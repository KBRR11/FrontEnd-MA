import { Component, OnInit } from '@angular/core';
import { Convocatoria } from "src/app/Modelo/Convocatoria";
import { ConvocatoriaService } from "src/app/service/convocatoria.service";
import { FormsModule } from '@angular/forms';
import { EpService } from 'src/app/service/Ep.service';
import { Ep } from 'src/app/Modelo/EP';
@Component({
  selector: 'app-crearconvocatoria',
  templateUrl: './crearconvocatoria.component.html',
  styleUrls: ['./crearconvocatoria.component.scss']
})
export class CrearconvocatoriaComponent implements OnInit {
  convocatoria:Convocatoria = new Convocatoria();
  listaep:Ep[]=[];
  constructor(private convocatoriaservice:ConvocatoriaService, private epservice:EpService) { }
 
  ngOnInit(): void {
    
    this.listarep();
    }
  Crear(convocatoria:Convocatoria){
    console.log(this.convocatoria)

    this.convocatoriaservice.crearConvocatoria(this.convocatoria).subscribe(

      (data)=>{
        alert(data);
      },(error)=>{
        alert("OCURRIO UN ERROR "+error);
      }
    )
  }
  listarep(){
    this.epservice.ListAllEp().subscribe(
      (data)=>{
        console.log(data);
        this.listaep = data["LIST_EP"];
      }
    )
    
  }

}
