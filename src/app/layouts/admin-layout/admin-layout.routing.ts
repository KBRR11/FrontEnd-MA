import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { ConvocatoriaCRUDComponent } from "../../pages/convocatoria-crud/convocatoria-crud.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";
//import { InicioComponent } from "../../md-inicio/inicio/inicio.component";
//import { ConveniosComponent } from "../../md-inicio/convenios/convenios.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  { path: "convocatoriamin", component: ConvocatoriaCRUDComponent }
  //{ path: "inicio", component: InicioComponent },
  //{ path: "convenios", component: ConveniosComponent },
  
  // { path: "rtl", component: RtlComponent }
];
