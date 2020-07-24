import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {PdfViewerModule} from 'ng2-pdf-viewer'

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
import { InfoConvocatoriaComponent } from '../../pages/info-convocatoria/info-convocatoria.component';
// import { RtlComponent } from "../../pages/rtl/rtl.component";
import { InicioComponent } from "../../md-inicio/inicio/inicio.component";
import { ConveniosComponent } from "../../md-inicio/convenios/convenios.component";
import { OpcionRComponent } from '../../pages/OpcionRol/opcion-r/opcion-r.component';
import { UsuariointComponent } from '../../pages/usuarioint/usuarioint.component';
import { RolesComponent } from '../../pages/roles/roles.component';
import { RecepcionardocComponent } from '../../pages/recepcionardoc/recepcionardoc.component';
import { OpcionComponent } from '../../pages/opcion/opcion/opcion.component';
import { RequisitoComponent} from '../../pages/requisito/requisito.component'
import { ViewerComponent} from '..//../pages/viewer/viewer.component';
import { InfoVacantesComponent } from '..//../pages/info_components/info-vacantes/info-vacantes.component';
import { InfoRequisitosComponent } from '..//../pages/info_components/info-requisitos/info-requisitos.component';
import { InfoValidadorComponent} from '..//../pages/info_components/info-validador/info-validador.component';
import { InfoConveniosComponent } from '..//../pages/info_components/info-convenios/info-convenios.component';
import { ValidarRequisitoComponent } from '../../pages/validar-requisito/validar-requisito.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    PdfViewerModule
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
    OpcionRComponent,
    CrearconvocatoriaComponent,
    DetalleconvocatoriaComponent,
    RecepcionardocComponent,
    OpcionComponent,
    RequisitoComponent,
    ViewerComponent,
    InfoConvocatoriaComponent,
    InfoVacantesComponent,
    InfoRequisitosComponent,
    InfoValidadorComponent,
    InfoConveniosComponent,
    ValidarRequisitoComponent
    //InicioComponent,
    //ConveniosComponent
    // RtlComponent
  ]
})
export class AdminLayoutModule {}
