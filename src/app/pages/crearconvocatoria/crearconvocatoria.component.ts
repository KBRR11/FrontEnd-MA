import { Component, OnInit } from '@angular/core';
import { Convocatoria } from "src/app/Modelo/Convocatoria";
import { ConvocatoriaService } from "src/app/service/convocatoria.service";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-crearconvocatoria',
  templateUrl: './crearconvocatoria.component.html',
  styleUrls: ['./crearconvocatoria.component.scss']
})
export class CrearconvocatoriaComponent implements OnInit {
  convocatoria:Convocatoria = new Convocatoria();
  constructor(private convocatoriaservice:ConvocatoriaService) { }
 
  ngOnInit(): void {
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

}
