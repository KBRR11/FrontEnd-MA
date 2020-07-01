import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms"

import { CabezaRoutes } from "../cabeza/cabeza.routing";
import { InicioComponent } from "../../md-inicio/inicio/inicio.component";
import { ConveniosComponent } from "../convenios/convenios.component";
import { ConvocatoriasComponent } from "../convocatorias/convocatorias.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap"

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(CabezaRoutes),
      FormsModule,
      HttpClientModule,
      NgbModule,
    ],
    declarations: [
      InicioComponent,
      ConveniosComponent,
      ConvocatoriasComponent
    ]
 })
export class CabezaModule{}