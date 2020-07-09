import { Component, OnInit } from '@angular/core';
import { OpcionService } from 'src/app/service/opcionService/opcion.service';
import { Opcion } from 'src/app/Modelo/Opcion';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { title } from 'process';

@Component({
  selector: 'app-opcion',
  templateUrl: './opcion.component.html',
  styleUrls: ['./opcion.component.scss']
})
export class OpcionComponent implements OnInit {
  show:boolean = true;
  show3:boolean = false;
  show2:boolean = false;
  listOpcion: Opcion[]=[];
  AddOpcion: Opcion= new Opcion();
  constructor(private service:OpcionService ,private router:Router) { }

  ngOnInit() {
    this.ListOpcion();
    /*this.service.getOpcion().subscribe((data)=>{
      console.log(data);
     // this.listOpcion = data['LIST_OPCION']
    })*/
  }
  ListOpcion(){
    this.service.getOpcion().subscribe((data)=>{
      console.log(data);
      this.listOpcion = data['LIST_OPCION']
      console.log(this.listOpcion);
    })
  }
  guardar(){
    console.log('soy agregar opcion'+this.AddOpcion)
    this.service.CreateOpcion(this.AddOpcion).subscribe(data=>{
      (Swal.fire('Opcion', ''+''+'Opcion registrada con éxito..!','success'));
      this.ListOpcion();
    })
    //(Swal.fire('Opcion', ''+''+'Opcion registrada con éxito..!','success');
  }
  DeleteOpcion(opcion:Opcion){
    Swal.fire({
      title:'¿Esta seguro?',
      text:'No podras revertir los cambios!',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar'
    }).then(result =>{
      if(result.value){
        console.log(opcion);
        this.service.DeleteOpcion(opcion).subscribe((data)=>{
          Swal.fire('Eliminado!','Opcion Eliminada Correctamente!','success')
          this.ListOpcion();
        })
      }
    });
  }
  UpdateOpcion(){
    console.log("actualizar")
  }
  modificar(){
    Swal.fire('Opcion', ''+''+'Opcion modificada con éxito..!','success');
  }
}
