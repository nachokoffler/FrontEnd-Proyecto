import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recluso } from '../interfaces/recluso-interface.js';
import { Data } from '../interfaces/data-interface.js';
import { Condena } from '../interfaces/condena-interface.js';

import { environment } from './../../environments/environment';
import { Celda } from '../interfaces/celda-interface.js';

@Injectable({
  providedIn: 'root'
})
export class ReclusosService {

  readonly api_recluso="https://jsonplaceholder.typicode.com/todos/"
  readonly api_condena="https://jsonplaceholder.typicode.com/todos/"
  readonly api_celda="https://jsonplaceholder.typicode.com/todos/"
  condenas:any
  condena:any
  recluso: any
  reclusos:any 
  messageService: any;
  celda:any;
  celdas:any;
  constructor(private http: HttpClient) {
    this.reclusos = [],
    this.recluso = {
      nombre:'',
      apellido:'',
      dni:'', 
      fecha_nac:''
    },
    this.condena={ 
      fecha_ini: '', 
      fecha_fin_estimada: '',
      fecha_fin_real : '',
      celda:this.celda
    },
    this.condenas = []
    this.celda= {

    }
    this.celdas= []
  }  


  getReclusos() { 
    return this.http.get<Recluso | any>(`${environment.API_URL}`+"reclusos")
  }
  postRecluso(x:any){
    return this.http.post<Recluso|any>(`${environment.API_URL}`+"reclusos/", x);
  }
  getOneRecluso(id:number) {
    return this.http.get<Recluso | any>(`${environment.API_URL}`+"reclusos/"+`${id}`);
  }
  getOneCondena(id:number) {
    return this.http.get<Condena | any>(this.api_condena+`${id}`);
  }
  getCondena() {
    return this.http.get<Condena | any>(`${environment.API_URL}`+"condenas")
  }
  postCondena(x:any){
    return this.http.post<Celda>(`${environment.API_URL}`+"condenas",x);
  }
  getOneCelda(id:number) {
    return this.http.get<any | JSON>(this.api_celda+`${id}`);

  }
  getCelda() {
    return this.http.get<any[] | JSON>(this.api_celda)
  }
  getLiberarRecluso(){
    return this.http.patch<Recluso | any>(`${environment.API_URL}`+"condenas/finalizar_condenas", null)
  }
}

