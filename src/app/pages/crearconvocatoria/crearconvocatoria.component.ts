import { Component, OnInit } from '@angular/core';
import { Convocatoria, DetalleConvocatoria} from "src/app/Modelo/Convocatoria";
import { ConvocatoriaService } from "src/app/service/convocatoria.service";
import { FormsModule } from '@angular/forms';
import { EpService } from 'src/app/service/Ep.service';
import { Ep } from 'src/app/Modelo/EP';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Convenio } from 'src/app/Modelo/Convenio';
import { ConvenioService } from 'src/app/service/convenio.service';


@Component({
  selector: 'app-crearconvocatoria',
  templateUrl: './crearconvocatoria.component.html',
  styleUrls: ['./crearconvocatoria.component.scss']
})
export class CrearconvocatoriaComponent implements OnInit {

  title: string = "Convocatorias"
  convocatoria:Convocatoria = new Convocatoria();
  listaep:Ep[]=[];
  convenios:Convenio[]=[];
  es: number [] = [];
  detalle_convo :DetalleConvocatoria [] = [];
  detalle : DetalleConvocatoria = new DetalleConvocatoria();

  //////////////////////
  file: string;

  primero: boolean =true;
  segundo: boolean = false;
  public archivoSeleccionado: File;
  idfacultad:number;
  constructor(private convocatoriaservice:ConvocatoriaService, private epservice:EpService,private convenioservice:ConvenioService, private http:HttpClient) { }
 
  ngOnInit(): void {
    this.listarconvnios();
    }

    mostrar(){
      this.primero=false;
      this.segundo=true;
    }
  Crear(){
    

    this.convocatoriaservice.crearConvocatoria(this.convocatoria).subscribe(
      (data)=>{
        alert(data);
        this.convocatoriaservice.listaConvocatoria().subscribe((data)=>{
          console.log(data["LIST_CONVOCATORIA"])
           var x:any = data["LIST_CONVOCATORIA"][0] 
          console.log(x as Convocatoria);

          

          this.convocatoriaservice.crear(this.archivoSeleccionado,(x as Convocatoria).idconvocatoria , 1)
          .subscribe(data =>{
            console.log(data)
            swal.fire('Datos ingresados correctamente', 'Convocatoria realizada', 'success');
          });
          for (let index = 0; index < this.es.length; index++) {
            const element = this.es[index];
            this.detalle.idconvocatoria=(x as Convocatoria).idconvocatoria;
            this.detalle.idconvenio=this.es[index];
            this.detalle.idescuela=1;
            this.detalle.n_vacantes=0;
            //this.detalle.nombre=(x as Convocatoria).nom_convocatoria
            /*this.detalle.desde= "2021-03-05 17:45:01"
            this.detalle.hasta= "2021-06-20 17:45:01"*/

            this.detalle_convo.push(this.detalle)
            this.convocatoriaservice.crearDetConvocatoria(this.detalle_convo[index]).subscribe((data) =>{
              console.log(data)
            })

          }
        })
        
      },(error)=>{
        alert("OCURRIO UN ERROR "+error);
      }
    )
   
  /* 
   console.log("hi")*/
  }
  listarconvnios(){
    this.convenioservice.getTodoCon().subscribe(
      (data)=>{
        console.log(data);
        this.convenios=data['LIST_CONVENIOS'];
      }
    )
  }
  listarep(){
    console.log(this.idfacultad)
    this.epservice.getEpforId(this.idfacultad).subscribe(
      (data)=>{
        console.log(data);
        this.listaep = data["EP"];
      }
    )
    
  }
  sele(po: number){
    let varia: boolean = false;
    for (let index = 0; index < this.es.length; index++) {
      const element = this.es[index];
      if (element==po ) {
        varia = true;
        this.es.splice(index,1)
        break;
      }
    }
    if(!varia){
      this.es.push(po); 
    }
    console.log(this.es)
  }


  selecfoto(event){
    this.archivoSeleccionado = event.target.files[0];
    console.log(this.archivoSeleccionado);
    
    console.log(this.file.split("\\")[this.file.split("\\").length-1]);
    this.file=this.file.split("\\")[this.file.split("\\").length-1]
    
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
