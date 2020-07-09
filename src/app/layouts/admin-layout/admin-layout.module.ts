import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { CrearconvocatoriaComponent } from "../../pages/crearconvocatoria/crearconvocatoria.component";
import { ConvocatoriaCRUDComponent } from "../../pages/convocatoria-crud/convocatoria-crud.component";
import { DetalleconvocatoriaComponent } from "../../pages/detalleconvocatoria/detalleconvocatoria.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";
import { InicioComponent } from "../../md-inicio/inicio/inicio.component";
import { ConveniosComponent } from "../../md-inicio/convenios/convenios.component";

import { UsuariointComponent } from '../../pages/usuarioint/usuarioint.component';
import { RolesComponent } from '../../pages/roles/roles.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TablesComponent,
    IconsComponent,
    TypographyComponent,
    NotificationsComponent,
    MapComponent,
    RolesComponent,
    UsuariointComponent,
    ConvocatoriaCRUDComponent,
    CrearconvocatoriaComponent,
    DetalleconvocatoriaComponent
    //InicioComponent,
    //ConveniosComponent
    // RtlComponent
  ]
})
export class AdminLayoutModule {}
