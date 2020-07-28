import { Routes } from "@angular/router";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { ConvocatoriaCRUDComponent } from "../../pages/convocatoria-crud/convocatoria-crud.component";
import { DetalleconvocatoriaComponent } from "../../pages/detalleconvocatoria/detalleconvocatoria.component";
import { UsuariointComponent } from 'src/app/pages/usuarioint/usuarioint.component';
import { RolesComponent } from 'src/app/pages/roles/roles.component';

import { OpcionComponent} from "../../pages/opcion/opcion/opcion.component";
import { CrearconvocatoriaComponent } from '../../pages/crearconvocatoria/crearconvocatoria.component';
import { RecepcionardocComponent } from '../../pages/recepcionardoc/recepcionardoc.component';
import { RequisitoComponent } from '../../pages/requisito/requisito.component';
import { InfoConvocatoriaComponent } from 'src/app/pages/info-convocatoria/info-convocatoria.component';
import { ValidarRequisitoComponent } from '../../pages/validar-requisito/validar-requisito.component';
// import { RtlComponent } from "../../pages/rtl/rtl.component";
//import { InicioComponent } from "../../md-inicio/inicio/inicio.component";
//import { ConveniosComponent } from "../../md-inicio/convenios/convenios.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent ,
  canActivate:[AuthGuard]},
  { path: "icons", component: IconsComponent ,
  canActivate:[AuthGuard]},
  { path: "maps", component: MapComponent,
  canActivate:[AuthGuard] },
  { path: "notifications", component: NotificationsComponent ,
  canActivate:[AuthGuard]},
  { path: "user", component: UserComponent ,
  canActivate:[AuthGuard]},
  { path: "tables", component: TablesComponent ,
  canActivate:[AuthGuard]},
  { path: "typography", component: TypographyComponent ,
  canActivate:[AuthGuard]},
  { path: "creaconv", component: CrearconvocatoriaComponent ,
  canActivate:[AuthGuard]},
  { path: "listarconv", component: ConvocatoriaCRUDComponent ,
  canActivate:[AuthGuard]},
  { path: "usuario_i", component: UsuariointComponent ,
  canActivate:[AuthGuard]},
  { path: "rol", component: RolesComponent ,
  canActivate:[AuthGuard]},
  { path: "detalleconv", component: DetalleconvocatoriaComponent ,
  canActivate:[AuthGuard]},
  { path: "opcion", component: OpcionComponent ,
  canActivate:[AuthGuard]},
  { path: "recepcionardoc", component: RecepcionardocComponent ,
  canActivate:[AuthGuard]},
  { path: "requisito", component: RequisitoComponent ,
  canActivate:[AuthGuard]}, 
  { path: "info_convo", component: InfoConvocatoriaComponent ,
  canActivate:[AuthGuard]},
  { path: "validar_req", component: ValidarRequisitoComponent ,
  canActivate:[AuthGuard]},
  //{ path: "inicio", component: InicioComponent },
  //{ path: "convenios", component: ConveniosComponent },
  // { path: "rtl", component: RtlComponent }
];
