import { Component, OnInit } from '@angular/core';
import { RequisitoService } from 'src/app/service/requisitoService/requisito.service';
import { Router } from '@angular/router';
import { Requisito } from 'src/app/Modelo/Requisito';
import { Convenio } from 'src/app/Modelo/Convenio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requisito',
  templateUrl: './requisito.component.html',
  styleUrls: ['./requisito.component.scss']
})
export class RequisitoComponent implements OnInit {
  show:boolean=true;
  listRequisitos: Requisito[]=[];
  loadReqData: Requisito[]=[];
  listConvenios: Convenio[]=[];
  loadReqConveData: Requisito[]=[];
  selectedConvenio: number= null;
  selectedConvenio2: number= null;
  convenio: Convenio = new Convenio();
  AddRequisito: Requisito = new Requisito();
  constructor(private service:RequisitoService,private router:Router) { }

  ngOnInit(){
    this.getAll();
    this.getAllConvenio();
    this.getReqConve();
  }

  getAll(){
    this.service.getRequisito().subscribe((data)=>{
      console.log(data);
      this.listRequisitos = data['LIST_REQUISITO']
      console.log('Lista de requisitos'+this.listRequisitos)
    })
  }

  getId(requisito:Requisito):void{
    this.service.getRequisitoId(requisito.idrequisito).subscribe((data)=>{
      this.loadReqData = data['P_IDREQUISITOS'];
      console.log('busqueda de id'+this.loadReqData);
    })
  }

  getAllConvenio(){
    this.service.getConvenios().subscribe((data)=>{
      console.log('Lista de convenios'+data);
      this.listConvenios = data['LIST_CONVENIOS'];
      console.log('Lista de convenios'+this.listConvenios);
    })
  }

  getReqConve(){
    console.log("hola"+this.selectedConvenio)
    this.service.getReqConve(this.selectedConvenio).subscribe((data)=>{
      console.log("soy la data",data)
      this.loadReqConveData = data['REQCONVE'];
      console.log('busqueda de id'+this.loadReqConveData);
    })
  }

  saveRequisito(){
    this.AddRequisito.idconvenio=this.selectedConvenio2;
    console.log('covenioID: '+ this.AddRequisito.idconvenio)
    this.service.createRequisito(this.AddRequisito).subscribe(data=>{
      console.log("soy la data DE GUARDAR",data);
      (Swal.fire('Requisito',''+''+'Requisito registrado con éxito...!'))
    })
  }

  selectConvenio(event:any){
    this.selectedConvenio = event.target.value;
    this.getReqConve();
  }

  selectConvenio2(event:any){
    this.selectedConvenio2 = event.target.value;
  }

  DeleteRequisito(idrequisito:number){
    Swal.fire({
      title:'¿Esta seguro?',
      text:'No podras revertir los cambios!',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar'
    }).then(result  =>{
      if(result.value){
        this.service.DeleteNoRequisito(idrequisito).subscribe((data)=>{
          Swal.fire('Eliminado!','Requisito Eliminado Correctamente!','success')
          this.getReqConve();
        })
      }
    })
  }
}
