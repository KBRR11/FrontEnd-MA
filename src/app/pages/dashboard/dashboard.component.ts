import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Usuarios } from "src/app/Modelo/Usuarios";
import { Personas } from "src/app/Modelo/Personas";
import { UsuariosService } from "src/app/service/usuarios.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
    .modal-xl{
      max-width:1000px;
    }
  `],
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  closeResult: string;
 
  public isCollapsedPen = true;
  public isCollapsedAct=true;
  public tableStudents= false;
  public tableTeachers=true;
  public tableStudentsAct=false;
  public tableTeachersAct = true;
  usuario : Usuarios = new Usuarios();
  usuariopen : Usuarios[] = [];
  usuarioact : Usuarios[] = [];
  usuarioEstpen : Usuarios[] = [];
  usuarioTeachpen : Usuarios[] = [];
  usuarioEstact : Usuarios[] = [];
  usuarioTeachact : Usuarios[] = [];
  ///// para tablas ///////////////
  userpenEst : Usuarios[] = [];
  userpenDoc: Usuarios[] = [];
  useractEst: Usuarios[] = [];
  useractDoc: Usuarios[] = [];
  ///////// para Modal ////////////
  personadata : Personas[] = [];

  constructor(private usuarioService:UsuariosService,private modalService: NgbModal) {}
  filterCodigo = '';
  filterDocumento='';

  ngOnInit() {
    this.contadorUsuarios();
    this.Userpending_est();
    this.Userpending_doc();
    this.Useractives_est();
    this.Useractives_doc();
    //console.log(sessionStorage);
   // console.log(localStorage);
}

openXl(content) {
  this.modalService.open(content, { size: 'xl' });
}

delete(usuario:Usuarios){
//console.log(usuario.IDUSUARIO);
Swal.fire({
  title: '¿ Estás Seguro ?',
  text: "Estas a punto de eliminar el usuario de:" +usuario.NOMBRES,
  icon: 'question',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, Eliminar!'
}).then((result) => {
  if (result.value) {
    this.usuarioService.deleteUserx100PRE(usuario.IDUSUARIO).subscribe(response =>{
  Swal.fire(
    'Usuario eliminado!',
    'Puedes enviarle una notificación de las razones por las que no puede participar a su correo: '+`<a href=https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${usuario.CORREO}&su=Movilidad+Académica&body=Hola+${usuario.NOMBRES.split(' ').join('+')},+tu+cuenta+fue+eliminada+por+los+siguientes+motivos:&tf=1 target='_blank'>`+usuario.CORREO+`</a>`,
    'success'
  )
  this.contadorUsuarios();
  this.Userpending_est();
  this.Userpending_doc();
  this.Useractives_est();
  this.Useractives_doc();
}, error =>{
  if(error.status==401 || error.status==404 || error.status==400 || error.status==500){
    Swal.fire('Error inesperado', 'Porfavor intentalo mas tarde', 'error');
  }
});
}
})

}

datosper(idusuario:number){
 
 
this.usuarioService.DatosPersona(idusuario).subscribe(
  (data) => {
    this.personadata = data['LIST_USER'];
     
    
  });
}
 


public activar(usuario:Usuarios){
  //console.log(usuario.IDUSUARIO);
  
  Swal.fire({
    title: '¿ Estás Seguro ?',
    text: "vas a activar el usuario de: "+usuario.NOMBRES,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, activar!'
  }).then((result) => {
    if (result.value) {
     

      this.usuarioService.ActivarUser(usuario.IDUSUARIO).subscribe(response =>{
        Swal.fire(
          'Usuario Activado!',
          'Puedes enviarle una notificación a su correo: '+`<a href=https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${usuario.CORREO}&su=Movilidad+Académica&body=Hola+${usuario.NOMBRES.split(' ').join('+')},+tu+cuenta+fue+activada+con+éxito.+Ahora+puedes+ingresar.&tf=1 target='_blank'>`+usuario.CORREO+`</a>`,
          'success'
        )
        this.contadorUsuarios();
        this.Userpending_est();
        this.Userpending_doc();
        this.Useractives_est();
        this.Useractives_doc();
      }, error =>{
        if(error.status==401 || error.status==404 || error.status==400 || error.status==500){
          Swal.fire('Error inesperado', 'Porfavor intentalo mas tarde', 'error');
        }
      });
      
    }
  })
}

desactivar(usuario:Usuarios){
  Swal.fire({
    title: '¿ Estás Seguro ?',
    text: "vas a desactivar el usuario de: "+usuario.NOMBRES,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, desactivar!'
  }).then((result) => {
    if (result.value) {
     // usuario.NOMBRES.split(' ',5);

      this.usuarioService.DesactivarUser(usuario.IDUSUARIO).subscribe(response =>{
        Swal.fire(
          'Usuario Desactivado!',
          'Puedes enviarle una notificación de los motivos de su desactivación a su correo: '+`<a href=https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${usuario.CORREO}&su=Movilidad+Académica&body=Hola+${usuario.NOMBRES.split(' ').join('+')}+tu+cuenta+fue+desactivada+por+los+siguientes+motivos:&tf=1 target='_blank'>`+usuario.CORREO+`</a>`,
          'success'
        )
        this.contadorUsuarios();
        this.Userpending_est();
        this.Userpending_doc();
        this.Useractives_est();
        this.Useractives_doc();
      }, error =>{
        if(error.status==401 || error.status==404 || error.status==400 || error.status==500){
          Swal.fire('Error inesperado', 'Porfavor intentalo mas tarde', 'error');
        }
      });
      
    }
  })
}

public Userpending_est(){
this.usuarioService.getAllPending_Est().subscribe((data) =>{
  this.userpenEst = data['P_CURSOR_EST_PEN'];
 
})
}
public Userpending_doc(){
  this.usuarioService.getAllPending_Doc().subscribe((data) =>{
    this.userpenDoc = data['P_CURSOR_DOC_PEN'];
   
  })
  }

  public Useractives_est(){
this.usuarioService.getAllActives_Est().subscribe((data) =>{
  this.useractEst = data['P_CURSOR_EST_ACT'];
})
  }
  public Useractives_doc(){
    this.usuarioService.getAllActives_Doc().subscribe((data) =>{
      this.useractDoc = data['P_CURSOR_DOC_ACT'];
    })
      }


public cambiarTeach(){
  this.tableStudents=true;
  this.tableTeachers=false;
}
public cambiarEst(){
  this.tableTeachers=true;
  this.tableStudents=false;
}
public cambiarTeachAct(){
  this.tableStudentsAct=true;
  this.tableTeachersAct=false;
}
public cambiarEstAct(){
  this.tableTeachersAct=true;
  this.tableStudentsAct=false;
  }

  public contadorUsuarios(){
    this.usuarioService.getCont_Pending().subscribe((data) =>{
      this.usuariopen = data['P_CURSOR_PEN'];
     
    })
    ////////////////////////////////////////////////////
    
    this.usuarioService.getContEst_Pending().subscribe((data) =>{
      this.usuarioEstpen = data['P_CURSOR_EST_PEN'];
     
    })

    ////////////////////////////////////////////////////

    this.usuarioService.getContTeach_Pending().subscribe((data) =>{
      this.usuarioTeachpen = data['P_CURSOR_TEACH_PEN'];
     
    })

   ////////////////////////////////////////////////////
   this.usuarioService.getCont_Actives().subscribe((data) =>{
    this.usuarioact = data['P_CURSOR_ACT'];
   
  })
  ////////////////////////////////////////////////////
  this.usuarioService.getContEst_Actives().subscribe((data) =>{
    this.usuarioEstact = data['P_CURSOR_EST_ACT'];
   
  })
  ////////////////////////////////////////////////////
  this.usuarioService.getContTeach_Actives().subscribe((data) =>{
    this.usuarioTeachact = data['P_CURSOR_TEACH_ACT'];
   
  })
  ////////////////////////////////////////////////////
  }

}
