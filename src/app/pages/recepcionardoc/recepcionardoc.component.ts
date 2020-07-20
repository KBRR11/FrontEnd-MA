import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap'
import Swal from 'sweetalert2';
import { Requisito } from 'src/app/Modelo/Requisito';
import { OpcionService } from 'src/app/service/opcionService/opcion.service';
import { Router } from '@angular/router';
import { RequisitoService } from 'src/app/service/requisitoService/requisito.service';
import { Convenio } from 'src/app/Modelo/Convenio';

@Component({
  selector: 'app-recepcionardoc',
  templateUrl: './recepcionardoc.component.html',
  styleUrls: ['./recepcionardoc.component.scss']
})

export class RecepcionardocComponent implements OnInit {
  show:boolean = true;
  listReq:Requisito[]=[]
  listConvenios:Convenio[]=[];
  selectedConvenio: number= null;
  loadReqConveData: Requisito[]=[];
  constructor(private_config:NgbAccordionConfig,private service:OpcionService,private router:Router, private service2:RequisitoService) { }

  ngOnInit(){
    //this.listar();
    this.getAllConvenio();
  }
 
  getReqConve(){
    console.log("hola"+this.selectedConvenio)
    this.service2.getReqConve(this.selectedConvenio).subscribe((data)=>{
      console.log("soy la data",data)
      this.loadReqConveData = data['REQCONVE'];
      console.log('busqueda de id'+this.loadReqConveData);
    })
  }
  getAllConvenio(){
    this.service2.getConvenios().subscribe((data)=>{
      console.log('Lista de convenios'+data);
      this.listConvenios = data['LIST_CONVENIOS'];
      console.log('Lista de convenios'+this.listConvenios);
    })
  }
  selectConvenio(event:any){
    this.selectedConvenio = event.target.value;
    this.getReqConve();
  }
  change(id) {
    switch (id) {
      case 1:
        document.getElementById('1').nodeValue='<i class=" tim-icons icon-minimal-up" (click)="change(1)" id="1">'
        break;
      case 2:
        alert("este es dos")
        break;
      case 3:
        alert("este es 3")
        break;
      case 4:
        alert("este es 4")
        break;
      case 5:
        alert("este es 5")
        break;
      default:
        Swal.fire('Error Desconocido', 'Comunicarse con el administrador', 'error');
        break;
    }
  }
}
