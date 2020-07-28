import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-validador',
  template: `<div class="container">
        <div>
          <h1>{{titulo}}</h1>
          <h3>{{validador}}</h3>
          </div>
        </div>`,
  styleUrls: ['./info-validador.component.scss']
})
export class InfoValidadorComponent implements OnInit {
  @Input() validador : String 

  titulo: string = "Vente";
  constructor() { }

  ngOnInit(): void {
  }


}
