import { Component, OnInit } from '@angular/core';
import { positionElements } from '@ng-bootstrap/ng-bootstrap/util/positioning';

@Component({
  selector: 'app-usuarioint',
  templateUrl: './usuarioint.component.html',
  styleUrls: ['./usuarioint.component.scss']
})
export class UsuariointComponent implements OnInit {

  user_cont: any[] = [{nombre: "Pele"}, {nombre: "Messi"}, {nombre: "Nick"}, {nombre: "Albert"}];
  title: string = "Usuarios"

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
