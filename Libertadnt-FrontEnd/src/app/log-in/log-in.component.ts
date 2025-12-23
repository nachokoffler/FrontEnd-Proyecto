import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
import { RouterOutlet ,RouterLink, Route, Router, ActivatedRoute} from '@angular/router';
import { UsuarioService } from './usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent  { 
  usuario: FormGroup;
  cod_administrador:FormControl;
  contrasenia: FormControl;
  bander = false;
  toaster: any;
  eToken: string | null | undefined;
  constructor (private service : UsuarioService,private router:Router,private route: ActivatedRoute ){
    this.contrasenia= new FormControl('',[Validators.required])
    this.cod_administrador= new FormControl('',[Validators.required])
    console.log(this.cod_administrador)
    this.usuario = new FormGroup({
      cod_administrador: this.cod_administrador,
      contrasenia: this.contrasenia,
    })
    this.route.paramMap.subscribe(params => {
      this.eToken = params.get('usuario')
      if(this.eToken == 'noAutorizado'){
        this.bandUsuario='noAutorizado';
      } else if (this.eToken == 'expirado') {
        this.bandUsuario='expirado'
      }
    })
  }
      


  bandUsuario: string | undefined
  bandera = ''
  validarUsuarios(){
    this.enviarUsuario()
  console.log(this.bandUsuario)
  console.log(this.bandera)
  }
  enviarUsuario(){
    this.service.postAdministrador(this.usuario.value).subscribe({
      next: (response)=> {
        if(!response.es_especial){
          this.bandUsuario='encontrado';
          this.bandera='menu'
          sessionStorage.setItem("token", response.token);
          sessionStorage.setItem("usuario", "menu");
          this.router.navigate(['usuario/menu'])
        }
        else {
          this.bandUsuario ='encontrado'
          this.bandera = "menu-maestro"
          sessionStorage.setItem("token", response.token);
          sessionStorage.setItem("usuario", "maestro");
          this.router.navigate(['usuario/menu-maestro'])
        }
      },
      error: (e)=> {
        console.log("usuario no valido ")
        console.log("estatus enviado: ",e.status)
        console.log("esto es el header ??")
        
        if(e.status == 404){
          this.bandUsuario='no encontrado';
        }
        if(e.status == 409){
          this.bandUsuario='incorrecto'
        }
        if(e.status == 401){
          this.bandUsuario='noAutorizado'
        }
        if(e.status == 403){
          this.bandUsuario='expirado'
        }
      }
    });
  }
}
