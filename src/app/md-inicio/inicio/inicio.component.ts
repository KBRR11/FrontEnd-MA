import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor(private router:Router, private _config:NgbCarouselConfig) {
    _config.showNavigationArrows = false;
    _config.interval=4000;
    // _config.interval = 2000;
    }

  ngOnInit() {
localStorage.clear();
  }

}
