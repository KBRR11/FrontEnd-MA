import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recepcionardoc',
  templateUrl: './recepcionardoc.component.html',
  styleUrls: ['./recepcionardoc.component.scss']
})

export class RecepcionardocComponent implements OnInit {
  show:boolean = true;
  show2:boolean = true;
  show3:boolean = true;
  show4:boolean = true;
  show5:boolean = true;
  constructor() { }

  ngOnInit(): void {
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
