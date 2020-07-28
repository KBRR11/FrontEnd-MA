import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    rtlTitle: "لوحة القيادة",
    icon: "icon-chart-pie-36",
    class: ""
  }/*,
  {
    path: "/icons",
    title: "Icons",
    rtlTitle: "الرموز",
    icon: "icon-atom",
    class: "",
  },
  {
    path: "/maps",
    title: "Maps",
    rtlTitle: "خرائط",
    icon: "icon-pin",
    class: "" },
  {
    path: "/notifications",
    title: "Notifications",
    rtlTitle: "إخطارات",
    icon: "icon-bell-55",
    class: ""
  },
 {
    path: "/user",
    title: "Perfil de Usuario",
    rtlTitle: "ملف تعريفي للمستخدم",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/tables",
    title: "Table List",
    rtlTitle: "قائمة الجدول",
    icon: "icon-puzzle-10",
    class: ""
  },
  {
    path: "/typography",
    title: "Typography",
    rtlTitle: "طباعة",
    icon: "icon-align-center",
    class: ""
    
  },
  {
    path: "/rol",
    title: "Rol",
    rtlTitle: "111",
    icon: "icon-atom",
    class: "",
  }*/,
  {
    path: "/info_convo",
    title: "info",
    rtlTitle: "123",
    icon: "icon-world",
    class: ""
  },
  {
    path: "/usuario_i",
    title: "User Int",
    rtlTitle: "123",
    icon: "icon-world",
    class: "",
  },
  {
    path: "/creaconv",
    title: "Convocatoria",
    rtlTitle: "CRUD Conv",
    icon: "icon-single-copy-04",
    class: ""
  },
  {
    path: "/listarconv",
    title: "Listar Convocatorias",
    rtlTitle: "CRUD Conv",
    icon: "icon-bullet-list-67",
    class: ""
  },
  {
    path: "/detalle2",
    title: "Detalle Directora",
    rtlTitle: "Detalle",
    icon: "icon-bullet-list-67",
    class: ""
  },
  {
    path: "/opcion",
    title: "Opcion",
    rtlTitle: "CRUD Opcion",
    icon: "tim-icons icon-settings",
    class: ""
  },
  {
    path: "/recepcionardoc",
    title: "Recepcionar",
    rtlTitle: "Recepcionar DOcumentos",
    icon: "tim-icons icon-settings",
    class: ""
  },
  {
    path: "/requisito",
    title: "Requisito",
    rtlTitle: "Requisitos",
    icon: "tim-icons icon-paper",
    class: ""
  },
  {
    path: "/validar_req",
    title: "Validar Requisito",
    rtlTitle: "Requisitos",
    icon: "tim-icons icon-single-copy-04",
    class: ""
  },
 /* {
    path: "/inicio",
    title: "FUNCA INICIO",
    rtlTitle: "ار تي ال",
    icon: "icon-world",
    class: ""
  },
  {
    path: "/convenios",
    title: "FUNCA CONVENIOS",
    rtlTitle: "ار تي ال",
    icon: "icon-world",
    class: ""
  }*/
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private router:Router) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    
    this.datosUser();
   this.Comprobación();
   
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
  datosUser(){/// sirve para obtener los datos
    let datos = JSON.parse(sessionStorage.getItem("personas"))
    document.getElementById("datosu").innerHTML=datos.nombres+"<br> "+datos.apellidos;
  }

  Comprobación(){
    let rol = JSON.parse(sessionStorage.getItem("personas"))
    if (rol.nom_rol=="ROLE_SECRETARY" || rol.nom_rol=="ROLE_ADMIN") {
      this.router.navigate(['/dashboard']);
    }else{
      this.router.navigate(['/user']);
      console.log('funka');
    }
  }

}
