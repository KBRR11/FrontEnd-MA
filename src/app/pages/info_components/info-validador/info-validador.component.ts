import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-validador',
  template: `<div class="container">
        <div>
          <h1>{{titulo}}</h1>
          </div>
        </div>`,
  styleUrls: ['./info-validador.component.scss']
})
export class InfoValidadorComponent implements OnInit {
  titulo: string = "Vente";
  constructor() { }

  ngOnInit(): void {
  }

}
