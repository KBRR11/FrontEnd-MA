import { Component, OnInit } from '@angular/core';
import { RequisitoService } from 'src/app/service/requisitoService/requisito.service';
import { Router } from '@angular/router';
import { Requisito } from 'src/app/Modelo/Requisito';
import { Convenio } from 'src/app/Modelo/Convenio';
import Swal from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ViewerComponent } from "../../pages/viewer/viewer.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Requisito_Convenio } from 'src/app/Modelo/Requisito_Convenio';

@Component({
  selector: 'app-requisito',
  templateUrl: './requisito.component.html',
  styleUrls: ['./requisito.component.scss']
})
export class RequisitoComponent implements OnInit {
  bsModalRef: BsModalRef;
  show: boolean = true;
  listRequisitos: Requisito[] = [];
  loadReqData: Requisito[] = [];
  loadRequisitoData: Requisito[] = [];
  listConvenios: Convenio[] = [];
  loadReqConveData: Requisito[] = [];
  loadReqConveData2: Requisito[] = [];
  loadDiferente: Requisito[] = [];
  ReqArchivo: Requisito[] = [];
  selectedConvenio: number = null;
  selectedConvenio2: number = null;
  selectedConvenio3: number = null;
  selectedConvenio4: number = null;
  estadovalue: number = null;
  archivoSeleccionado: File;
  convenio: Convenio = new Convenio();
  AddRequisito: Requisito = new Requisito();
  AddRequisito1: Requisito = new Requisito();
  AddRequisitoConvenio: Requisito_Convenio = new Requisito_Convenio();
  modRequisito: Requisito = new Requisito();

  idco: number[] = [];
  constructor(private modalService: NgbModal, private service: RequisitoService, private router: Router) { }

  ngOnInit() {
    this.getVacio();
    this.getAllConvenio();
    this.getAll();
  }

  getVacio() {
    if (typeof this.loadReqConveData2 == 'object' && typeof this.loadReqConveData == 'object') {
      console.log("Esta Vacio")
    } else {
      this.getReqConve();
    }
  }
  getAll() {
    this.service.getRequisito().subscribe((data) => {
      console.log(data);
      this.listRequisitos = data['LIST_REQUISITO']
      console.log('Lista de requisitos' + this.listRequisitos)
    })
  }

  getId(requisito: Requisito): void {
    this.service.getRequisitoId(requisito.idrequisitos).subscribe((data) => {
      this.loadReqData = data['P_IDREQUISITOS'];
      console.log('busqueda de id' + this.loadReqData);
    })
  }

  getAllConvenio() {
    try {
      this.service.getConvenios().subscribe((data) => {
        console.log('Lista de convenios' + data);
        this.listConvenios = data['LIST_CONVENIOS'];
      })
    } catch (error) {
      console.log(error)
    }
  }

  getReqConve() {
    if (this.estadovalue == 1) {
      console.log("estamos en listado de estado 1");
      this.service.getReqConve(this.selectedConvenio).subscribe((data) => {
        this.loadReqConveData = data['REQCONVE'];
        console.log(data)
      })
    } else if (this.estadovalue == 0) {
      console.log("estamos en listado de estado 0 ");
      this.service.getReqConve2(this.selectedConvenio).subscribe((data) => {
        this.loadReqConveData2 = data['REQCONVE'];
      })
    } else {
      console.log("Intentelo Nuevamente")
    }
  }
  getDiferenteConvenio() {
    try {
      this.service.getReqConveDiferente(this.selectedConvenio2).subscribe((diferente) => {
        this.loadDiferente = diferente['REQCONVE'];
        if (typeof this.loadDiferente == 'object') {
          (Swal.fire('Requisito', '' + '' + 'Este Convenio no tiene requisitos ...!'))
        } else {
          this.getDiferenteConvenio();
        }
      })
    } catch (error) {

    }
  }
  duplicateRequisito(){
  console.log("Duplicate Requisito",this.AddRequisito.nombre);
  console.log("Lista R",this.listRequisitos);
   this.listRequisitos.forEach(req => {
     console.log("requisito nombres ",req.nombre)
      if(req.nombre==this.AddRequisito.nombre){
        Swal.fire('Requisito ya existe!', 'Ingrese otro nombre..!', 'warning')
      }else{
        console.log("Requisito listo para agregarse.");
        //this.saveRequisito();
      }
    });
  }
  saveRequisito() {
    this.service.createRequisito(this.AddRequisito).subscribe(data => {
      this.service.getRequisito().subscribe((data) => {
        this.AddRequisito1 = data['LIST_REQUISITO'];
        this.obtenerIdRC();
        try {
          console.log("soy la data dentro de save", data);
          this.ReqArchivo = data['LIST_REQUISITO'];
          console.log("IDNICK" + this.ReqArchivo[0].idrequisitos)
          this.service.crearArchivo(this.archivoSeleccionado, this.ReqArchivo[0].idrequisitos, 4).subscribe((theone) => {
            console.log(theone + "=zero");
          })
        } catch (error) {
          console.log(error);
        }
      })
      console.log("soy la data DE GUARDAR", data);
      (Swal.fire('Requisito', '' + '' + 'Requisito registrado con éxito...!'))
    })
  }
  obtenerIdRC() {
    console.log("Estamos en obtener IDRC ");
    //this.AddRequisitoConvenio.idconvenio = this.selectedConvenio2;
    console.log("data de obtener id " + this.AddRequisitoConvenio.idrequisito);
    console.log("data de obtener id " + this.AddRequisitoConvenio.idconvenio);
    for (let i = 0; i < this.idco.length; i++) {
      this.AddRequisitoConvenio.idrequisito = this.AddRequisito1[0].idrequisitos;
      this.AddRequisitoConvenio.idconvenio = this.idco[i];
      console.log("data de obtener id " + i + "nro:" + this.AddRequisitoConvenio.idrequisito);
      console.log("data de obtener id " + this.AddRequisitoConvenio.idconvenio);
      this.service.VincularConvenioRequisito(this.AddRequisitoConvenio).subscribe(data => {
        console.log(data);
      })
    }
  }
  vincularRequisito() {
    for (let i = 0; i< this.idco.length;i++) {
      this.AddRequisitoConvenio.idconvenio = this.selectedConvenio2;
      this.AddRequisitoConvenio.idrequisito= this.idco[i];
      this.service.VincularConvenioRequisito(this.AddRequisitoConvenio).subscribe(data => {
        console.log(data);
        
      })
    }
    (Swal.fire('Requisito', '' + '' + 'Requisito vinculado con éxito...!'))
  }
  selectConvenio(event: any, id) {
    this.selectedConvenio = event.target.value;
    this.estadovalue = event.target.value;
    this.estadovalue = id;
    this.getReqConve();
  }
  selectConvenio2(event: any) {
    this.selectedConvenio2 = event.target.value;
    this.getDiferenteConvenio();
  }
  selectConvenio3(event: any) {
    this.selectedConvenio3 = event.target.value;
  }
  selectConvenio4(event: any) {
    this.selectedConvenio4 = event.target.value;
  }

  DeleteRequisito(req: Requisito) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: 'No podras revertir los cambios!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then(result => {
      if (result.value) {
        this.service.DeleteNoRequisito(req).subscribe((data) => {
          Swal.fire('Eliminado!', 'Requisito Eliminado Correctamente!', 'success')
          this.getReqConve();
        })
      }
    })
  }

  loadRequisito(requisito: Requisito): void {
    this.service.getRequisitoId(requisito.idrequisitos).subscribe((data) => {
      console.log(requisito);
      this.loadRequisitoData = data['REQUISITO'];
    })
  }
  updateReq(requisito: Requisito) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Se modificaron los datos!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Modificar'
    }).then(result => {
      if (result.value) {
        console.log("update", requisito)
        this.service.updateRequisito(requisito).subscribe((data) => {
          Swal.fire('Modificado!', 'Requisito Modificado Correctamente!', 'success')
          this.getReqConve();
        })
      }
    })
  }

  selecfoto(event) {
    this.archivoSeleccionado = event.target.files[0];
    console.log(this.archivoSeleccionado);
  }

  openModalWithComponent() {
    const initialState = {

      title: 'Ver Documentos',
      size: 'xl'
    };
    const theone = this.modalService.open(ViewerComponent, initialState);
    theone.componentInstance.closeBtnName = 'Close';
    //this.bsModalRef.content.closeBtnName = 'Close';
  }
  vincular(co: number) {
    let selec: boolean = false;
    for (let i = 0; i < this.idco.length; i++) {
      const element = this.idco[i];
      if (element == co) {
        selec = true;
        this.idco.splice(i, 1);
        break;
      }
    }
    if (!selec) {
      this.idco.push(co);
    }
    console.log(this.idco);
  }
}
