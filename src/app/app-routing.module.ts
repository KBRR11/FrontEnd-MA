import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { CabezaComponent } from "./md-inicio/cabeza/cabeza.component";
import { LoginComponent } from "./login/login.component";
//import { InicioComponent } from './md-inicio/inicio/inicio.component';
//import { ConveniosComponent } from "./md-inicio/convenios/convenios.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/inicio",
    pathMatch: "full"
  },
  {
    path: 'cabeza',
    component:CabezaComponent
  },
  {
    path:"login",
    component:LoginComponent
      },
  {
   path: "",
   component:CabezaComponent,
   children:[
     {
       path:"",
       loadChildren:
       "./md-inicio/cabeza/cabeza.module#CabezaModule"
     }
   ]
  },
  
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule"
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  },
  {
    path: "**",
    redirectTo: "/inicio"
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
