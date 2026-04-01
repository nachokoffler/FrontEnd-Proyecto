import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Sentencia } from '../interfaces/sentencia-interface.js';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SentenciasService {
  sentencias:any 
  messageService: any;
  sentencia: any
  constructor(private http: HttpClient) {
    this.sentencias =  [],
    this.sentencia = {
      cod_sentencia:0, 
      nombre :'', 
      descripcion: '', 
      duracion_anios:''
    }
  }

  private log(message: string) {
    this.messageService.add(`GuaridaService: ${message}`);
  }

  getSentencias() {
    return this.http.get<Sentencia >(`${environment.API_URL}`+"sentencias")
  }
  getOneSentencias(id:any) {
    return this.http.get<Sentencia >(`${environment.API_URL}`+`sentencias/${id}`)
  }
  postSentencias(sActual:Sentencia){
    return this.http.post<any| JSON>(`${environment.API_URL}`+"sentencias/",sActual)
  }
}


