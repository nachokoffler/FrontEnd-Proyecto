import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario-interface.js';
import { Data } from '../interfaces/data-interface.js';
import { environment } from './../../environments/environment';
import { Administrador } from '../interfaces/administrdor-interface.js';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  constructor(private http: HttpClient) { 

  }
  getAdministrador() {
    return this.http.get<Administrador | JSON>(`${environment.API_URL}`+"administradores")
  }

  getSomeAdministrador(nombre: string, apellido: string) {
    return this.http.get<Administrador>(`${environment.API_URL}`+"administradores/"+`${nombre}`+"&"+`${apellido}`);
  }

  postAdministrador(administrador: object) {
    return this.http.post<Administrador | JSON>(`${environment.API_URL}`+"administradores",administrador);
  }
}



