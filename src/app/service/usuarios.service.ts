import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from "src/app/service/login.service";
import { Usuarios, Usuario } from "src/app/Modelo/Usuarios";
import { Rol} from "src/app/Modelo/Rol";
@Injectable({
    providedIn: 'root'
  })
  export class UsuariosService {
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
 usuario:Usuarios = new Usuarios();
    constructor(private http:HttpClient, private router:Router, private loginService:LoginService) { }

    private agregarAutorizacion(){
        let token = this.loginService.token;
        if(token!=null){
          
          return this.httpHeaders.append('Authorization','Bearer' + token);
        }
        
        return this.httpHeaders;
      }

//////////////////////////// CREACION DE USUARIOS //////////////////////////////////////////////////////////////////////////////////////////////////
      crearUsuarioEstudiante(usuario:Usuarios){
        return this.http.post<Usuarios>(`${ environment.apiUrl }/api/add_student`,usuario,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
             return throwError(e);
           }))
      }

      crearUsuarioDocente(usuario:Usuarios){
        return this.http.post<Usuarios>(`${ environment.apiUrl }/api/add_teacher`,usuario,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
             return throwError(e);
           }))
      }

///////////////////////// CONFIGURACION DE USUARIO //////////////////////////////////////////////////////////////////////////////////////////////
      updateColores(usuario:Usuarios){
        let id = JSON.parse(sessionStorage.getItem("personas"));
  
    this.usuario.idusuario = id.idusuario;
        return this.http.put<Usuarios>(`${ environment.apiUrl }/api/upd/colores/`+this.usuario.idusuario,usuario,{headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
      
          return throwError(e);
        }));
      }
///////////////////////////// CONTADORES ADMINISTRATIVOS //////////////////////////////////////////////////////////////////
      getCont_Pending(): Observable<Usuarios[]> {
        return this.http.get<Usuarios[]>(`${ environment.apiUrl}/api/contador_pending`,{headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
      
          return throwError(e);
        }));
    }
    
    getContEst_Pending(): Observable<Usuarios[]> {
      return this.http.get<Usuarios[]>(`${ environment.apiUrl}/api/contEst_pending`,{headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
    
        return throwError(e);
      }));
  }

  getContTeach_Pending(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${ environment.apiUrl}/api/contTeach_pending`,{headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
  
      return throwError(e);
    }));
}

    getCont_Actives(): Observable<Usuarios[]> {
      return this.http.get<Usuarios[]>(`${ environment.apiUrl}/api/contador_active`,{headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
    
        return throwError(e);
      }));
  }

  getContEst_Actives(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${ environment.apiUrl}/api/contEst_active`,{headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
  
      return throwError(e);
    }));
}

getContTeach_Actives(): Observable<Usuarios[]> {
  return this.http.get<Usuarios[]>(`${ environment.apiUrl}/api/contTeach_active`,{headers: this.agregarAutorizacion()}).pipe(catchError(e =>{

    return throwError(e);
  }));
}

////////////////////////////////// TRAER DATOS PERSONALES Y ACTUALIZAR //////////////////////////////////////////////////////////////////////////


DatosPersona(idusuario:number){
  
  return this.http.get<Usuarios[]>(`${ environment.apiUrl }/api/listarDatosPersona/`+idusuario,{headers: this.agregarAutorizacion()}).pipe(catchError(e =>{

    return throwError(e);
  }));
}
//////////////////////////////////////////// ACTUALIZAR CONTRASEñA //////////////////////////////////////////////////////////////////

updatePassword(password:string){
  let id = JSON.parse(sessionStorage.getItem("personas"));
//console.log(password);
this.usuario.idusuario = id.idusuario;

this.usuario.password=password;
  return this.http.put<Usuarios>(`${ environment.apiUrl }/api/upd/password/`+this.usuario.idusuario,this.usuario,{headers: this.agregarAutorizacion()}).pipe(catchError(e =>{

    return throwError(e);
  }));
}

//////////////////////////////////////////// ACTUALIZAR USERNAME //////////////////////////////////////////////////////////////////

updateUsername(username:string){
  let id = JSON.parse(sessionStorage.getItem("personas"));
//console.log(username);
this.usuario.idusuario = id.idusuario;

this.usuario.usuario=username;
  return this.http.put<Usuarios>(`${ environment.apiUrl }/api/upd/nom_user/`+this.usuario.idusuario,this.usuario,{headers: this.agregarAutorizacion()}).pipe(catchError(e =>{

    return throwError(e);
  }));
}

////////////////////////////////// TABLA DE USUARIOS PENDIENTES EN DASHBOARD /////////////////////////////////////////////
getAllPending_Est(): Observable<Usuarios[]> {
  return this.http.get<Usuarios[]>(`${ environment.apiUrl}/api/all_pending_Est`,{headers: this.agregarAutorizacion()}).pipe(catchError(e =>{

    return throwError(e);
  }));
}

getAllPending_Doc(): Observable<Usuarios[]> {
  return this.http.get<Usuarios[]>(`${ environment.apiUrl}/api/all_pending_Doc`,{headers: this.agregarAutorizacion()}).pipe(catchError(e =>{

    return throwError(e);
  }));
}
////////////////////////////////// TABLA DE USUARIOS ACTIVOS EN DASHBOARD /////////////////////////////////////////////
getAllActives_Est(): Observable<Usuarios[]> {
  return this.http.get<Usuarios[]>(`${ environment.apiUrl}/api/all_students`,{headers: this.agregarAutorizacion()}).pipe(catchError(e =>{

    return throwError(e);
  }));
}

getAllActives_Doc(): Observable<Usuarios[]> {
  return this.http.get<Usuarios[]>(`${ environment.apiUrl}/api/all_teachers`,{headers: this.agregarAutorizacion()}).pipe(catchError(e =>{

    return throwError(e);
  }));
}

//////////////////////////////////////// ACTIVAR POSTULANTES //////////////////////////////////////////////////////////

ActivarUser(idusuario:number){ /////////////////// ANGULAR AHORA ASI SE HACE EL PUT
  //console.log(idusuario+ " llega al service");
  this.usuario.idusuario=idusuario;
  return this.http.put<Usuarios>(`${ environment.apiUrl }/api/activate/`+idusuario,this.usuario,{headers: this.agregarAutorizacion()}).pipe(catchError(e =>{

    return throwError(e);
  }));
}
//////////////////////////////////////// DESACTIVAR POSTULANTES //////////////////////////////////////////////////////////
DesactivarUser(idusuario:number){ /////////////////// ANGULAR AHORA ASI SE HACE EL PUT
  //console.log(idusuario+ " llega al service");
  this.usuario.idusuario=idusuario;
  return this.http.put<Usuarios>(`${ environment.apiUrl }/api/deactivate/`+idusuario,this.usuario,{headers: this.agregarAutorizacion()}).pipe(catchError(e =>{

    return throwError(e);
  }));
}

//////////////////////////////////////// ELMINAR POSTULANTES PARA SIEMPRE //////////////////////////////////////////////////////////

deleteUserx100PRE(idusuario: number){
  return this.http.delete<Usuarios[]>(`${ environment.apiUrl }/api/delete_user/` + idusuario,{headers: this.agregarAutorizacion()}).pipe(catchError(e =>{

    return throwError(e);
  }));
}

//////////////////////////////////////// ACTULIZAR FOTO USUARIO //////////////////////////////////////////////////////////

updateFotoUser(archivo:File,id){
  const formdata = new FormData();
  formdata.append("archivo",archivo);
  formdata.append("id",id);
  return this.http.post(`${ environment.apiUrl }/api/subirfoto`,formdata).pipe(catchError(e =>{

    return throwError(e);
  }));
}

      //////////new inter////////////////////777
      getUser(){
        return this.http.get<Usuario>(`${ environment.apiUrl }/api/listar`,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
          return throwError(e);
        }))
      }
      getUserID(iduser: number){
        return this.http.get<Usuario>(`${ environment.apiUrl }/api/listar/`+ iduser,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
          return throwError(e);
        }))
      }

      crearUser(usuario:Usuario){
        return this.http.post<Usuario>(`${ environment.apiUrl }/api/add_user`,usuario,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
             return throwError(e);
           }))
      }

      modificaUser(usuario:Usuario){
        return this.http.put<Usuario>(`${ environment.apiUrl }/api/update_user/`+usuario.idusuario,usuario,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
          return throwError(e);
        }))
      }

      deleteUser(iduser:number){
        return this.http.get<Usuario>(`${ environment.apiUrl }/api/delete/`+ iduser,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
          return throwError(e);
        }))
      }

      getrol(){
        return this.http.get<Rol>(`${ environment.apiUrl }/api/rol`,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
          return throwError(e);
        }))
      }

      getrolId(idrol:number){
        return this.http.get<Rol>(`${ environment.apiUrl }/api/rol/`+idrol,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
          return throwError(e);
        }))
      }

      eliminar(id:number){
        return this.http.delete<Usuario>(`${ environment.apiUrl }/api/delete/`+id,{ headers: this.agregarAutorizacion()}).pipe(catchError(e =>{
            
          return throwError(e);
        }))
      }

    }