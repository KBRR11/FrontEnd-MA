import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { CabezaComponent } from './md-inicio/cabeza/cabeza.component';
import { LoginComponent } from './login/login.component';
import { RegisterPerComponent } from './Registro-Usuarios/register-per/register-per.component';
import { RegisterUSERComponent } from './Registro-Usuarios/register-user/register-user.component';
import { DatosAcademicosComponent } from './Registro-Usuarios/datos-academicos/datos-academicos.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, CabezaComponent, LoginComponent, RegisterPerComponent, RegisterUSERComponent, DatosAcademicosComponent, ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
