import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service.js';
import { Usuario } from '../../interfaces/usuario-interface.js';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{
  constructor(public service: UsuarioService){}
  ngOnInit(): void {
    this.service.getUsuario().subscribe({
      next:(data)=>{
        if(data){
          console.log("administradores encontrados status == 201")
          this.service.usuarios=data
          this.bandera=true
          console.log(this.service.usuarios)
        }},
      error:(e)=>{
        if(e.status == 404){
          console.log("administradores no encontrados")
          this.bandera= false
        }
        }})
  }
  bandera:boolean|undefined
  eliminar(uActual:Usuario){
    this.service.deleteAdministrador(uActual.cod_administrador).subscribe({
      next:(data)=>{
        if(data){
          console.log("administrador borrado", data)
        }},
      error:(e)=>{
        if(e.status == 404){
          console.log("administradores no encontrados",e)
        }
        }})
  }
  
  recargar() {
    window.location.reload();
  }
}
