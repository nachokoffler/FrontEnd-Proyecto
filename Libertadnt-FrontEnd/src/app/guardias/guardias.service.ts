import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Guardia } from '../interfaces/guardia-interface.js';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuardiasService {
  readonly api_url="https://jsonplaceholder.typicode.com/todos/"
  guardia: any
  guardias:any=[] //
  messageService: any;
  constructor(private http: HttpClient) {this.guardias =  [],
    this.guardia={
      nombre: "",
      apellido: "", 
      dni: 0
    }
  }  

  getGuardias() {
    const token = localStorage.getItem('token');  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Guardia | JSON>(`${environment.API_URL}`+"guardias", {headers})
  }
  postGuardia(x:any){
    return this.http.post<Guardia>(`${environment.API_URL}`+"guardias",x);
  }

  putFinalizarGuardia(x:any){
    return this.http.put<Guardia | JSON>(`${environment.API_URL}`+"guardias/finalizarContrato",x);
  }

  getOneGuardias(id:number) {
    return this.http.get<Guardia | JSON>(`${environment.API_URL}`+"guardias/"+`${id}`);
  }
}



