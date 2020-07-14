import { Component, OnInit } from '@angular/core';
import { Convocatoria } from "src/app/Modelo/Convocatoria";
import { ConvocatoriaService } from "src/app/service/convocatoria.service";
import { FormsModule } from '@angular/forms';
import { EpService } from 'src/app/service/Ep.service';
import { Ep } from 'src/app/Modelo/EP';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
@Component({
  selector: 'app-crearconvocatoria',
  templateUrl: './crearconvocatoria.component.html',
  styleUrls: ['./crearconvocatoria.component.scss']
})
export class CrearconvocatoriaComponent implements OnInit {
  convocatoria:Convocatoria = new Convocatoria();
  listaep:Ep[]=[];

  //////////////////////
  public archivoSeleccionado: File;
  listaconvocatorias:Convocatoria[]=[]
  constructor(private convocatoriaservice:ConvocatoriaService, private epservice:EpService, private http:HttpClient) { }
 
  ngOnInit(): void {
    
    this.listarep();
    }
     listar(){
        this.convocatoriaservice.listaConvocatoria().subscribe((data)=>{
        console.log(data["LIST_CONVOCATORIA"])
        this.listaconvocatorias=data["LIST_CONVOCATORIA"]
      })
      
    }
  Crear(){
    

    /*this.convocatoriaservice.crearConvocatoria(this.convocatoria).subscribe(

      (data)=>{
        alert(data);
      },(error)=>{
        alert("OCURRIO UN ERROR "+error);
      }
    )
    */
   console.log(this.listar());
   this.listar();
   var x = this.listaconvocatorias[this.listaconvocatorias.length]
    console.log(x)
   this.convocatoriaservice.crear(this.archivoSeleccionado, 1, 1)
   .subscribe(data =>{
     console.log(data)
     swal.fire('Son putos por eso de subio', 'Felicitaciones lo lograron vayanse a dormir', 'success');
   });
   console.log("hi")
  }
  listarep(){
    this.epservice.ListAllEp().subscribe(
      (data)=>{
        console.log(data);
        this.listaep = data["LIST_EP"];
      }
    )
    
  }
  selecfoto(event){
    this.archivoSeleccionado = event.target.files[0];
    console.log(this.archivoSeleccionado);
  }

  actualizar(){
    this.convocatoriaservice.upload(this.archivoSeleccionado, 1, 4, 3)
      .subscribe(data =>{
        console.log(data)
        swal.fire('Son putos por eso de subio', 'Felicitaciones lo lograron vayanse a dormir', 'success');
      });
      console.log("hi")
  }
}
