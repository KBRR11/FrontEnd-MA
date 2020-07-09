import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  user_cont: any[] = [{nombre: "Juan"}, {nombre: "Messi"}, {nombre: "Nick"}, {nombre: "Albert"}];
  title: string = "Roles"

  modifica: boolean = false;
  crea: boolean = false;
  bori: boolean = true;
  header: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  mostrar_crear(){
    this.crea=true;
    this.bori=false;
    this.header=false;
  }
  ocultar_crear(){
    this.crea=false;
    this.bori=true;
    this.header=true;
  }

  mostrar_modi(){
    this.modifica=true;
    this.bori=false;
    this.header=false;
  }

}
