import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule, BsModalRef} from 'ngx-bootstrap/modal'

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



//import { ConvocatoriasComponent } from './md-inicio/convocatorias/convocatorias.component';
//import { ConveniosComponent } from './md-inicio/convenios/convenios.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, CabezaComponent, LoginComponent, RegisterPerComponent, RegisterUSERComponent, DatosAcademicosComponent ],
  providers: [
    BsModalRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
