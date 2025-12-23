import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario-interface.js';
import { Data } from '../interfaces/data-interface.js';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  readonly api_url ='https://jsonplaceholder.typicode.com/todos/'
  messageService: any;
  usuario:any
  usuarios:any
  usuarioEspecial:any
  constructor(private http: HttpClient) {
    this.usuarios = [],
    this.usuario={ cod_administrador: 0,  contrasenia: ""}
  }  
  private log(message: string) {
    this.messageService.add(`GuaridaService: ${message}`);
  }
  getUsuario() {
    return this.http.get<Usuario | JSON>(`${environment.API_URL}`+"administradores")
    
  }
  getOneUsuario(id:any) {
    return this.http.get<Usuario>(`${environment.API_URL}`+"administradores/"+`${id}`)
  }
  postAdministrador(uActual:Usuario){
    return this.http.post<Usuario>(`${environment.API_URL}`+"administradores/logIn", uActual)
  }

}




