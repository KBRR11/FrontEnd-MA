import { Component, OnInit } from "@angular/core";
import { Usuarios } from "src/app/Modelo/Usuarios";
import { UsuariosService } from "src/app/service/usuarios.service";
import Swal from 'sweetalert2';

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit {
  usuario:Usuarios =new Usuarios();
  public sidebarColor: string = "red";

  constructor(private usuariosService:UsuariosService) {}
  changeSidebarColor(color){
    let color_menu = color;
    localStorage.setItem("color_menu",color_menu);
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var mainPanel = document.getElementsByClassName('main-panel')[0];

    this.sidebarColor = color;

    if(sidebar != undefined){
        sidebar.setAttribute('data',color);
    }
    if(mainPanel != undefined){
        mainPanel.setAttribute('data',color);
    }
  }
  changeDashboardColor(color){
    let color_fondo = color;
    localStorage.setItem("color_fondo",color_fondo);
    var body = document.getElementsByTagName('body')[0];
    if (body && color === 'white-content') {
        body.classList.add(color);
    }
    else if(body.classList.contains('white-content')) {
      body.classList.remove('white-content');
    }
  }
  ngOnInit() {
    let colores = JSON.parse(sessionStorage.getItem("personas"));
    //console.log(colores.color_fondo);
    this.changeDashboardColor(colores.color_fondo);
    this.changeSidebarColor(colores.color_menu);
  }

  guardarcambios(){
    
    let id = JSON.parse(sessionStorage.getItem("personas"));
    this.usuario.idusuario = id.idusuario;
    //console.log(id.idusuario);
    this.usuario.color_fondo = localStorage.getItem("color_fondo");
    this.usuario.color_menu = localStorage.getItem("color_menu");
    this.usuariosService.updateColores(this.usuario).subscribe();
    //console.log(localStorage)
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Cambios Guardados',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
