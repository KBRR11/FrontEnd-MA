import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cabeza',
  templateUrl: './cabeza.component.html',
  styleUrls: ['./cabeza.component.scss']
})
export class CabezaComponent implements OnInit {

  constructor(private loginService:LoginService ,private router:Router) { }

  ngOnInit(): void {
    let datosusu = JSON.parse(sessionStorage.getItem("personas"));
    if(this.loginService.isAuthenticated()==true){
      Swal.fire('Login','Hola '+ datosusu.nombres +' ya estas Autentificado', 'info');
      this.router.navigate(['/dashboard']);
      
    }else{
      localStorage.clear();
      sessionStorage.clear();
      
    }
  }

}
