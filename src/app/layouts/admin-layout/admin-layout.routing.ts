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
import { OpcionComponent} from "../../pages/opcion/opcion/opcion.component";
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
  { path: "convocatoriamin", component: ConvocatoriaCRUDComponent ,
  canActivate:[AuthGuard]},
  { path: "opcion", component: OpcionComponent ,
  canActivate:[AuthGuard]},
  //{ path: "inicio", component: InicioComponent },
  //{ path: "convenios", component: ConveniosComponent },
  
  // { path: "rtl", component: RtlComponent }
];
