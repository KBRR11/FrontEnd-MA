import { Routes } from "@angular/router";

import { InicioComponent } from "../inicio/inicio.component";
import { ConveniosComponent } from "../convenios/convenios.component";
import { ConvocatoriasComponent } from "../convocatorias/convocatorias.component";
export const CabezaRoutes: Routes = [
      {path: "inicio", component: InicioComponent },
      {path:"convenios", component: ConveniosComponent},
      {path:"convocatorias", component: ConvocatoriasComponent}
    
  ];