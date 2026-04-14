import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actividad } from '../interfaces/actividad-interface.js';
import { Ilegal } from '../interfaces/ilegal-interface.js';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  [x: string]: any;
  ilegales: any=[]
  actividades: any=[]  
  actividad:Actividad ={
    nombre: '',
    descripcion: '',
    locacion: '',
    dia_de_la_semana: 0,
    hora_inicio: '',
    hora_fin: '',
    estado: 0,
    cantidad_minima: 0,
    edad_minima: 0,
    cod_sector: 0,
    reclusos: [],
    actividades: [],
    cod_actividad: 0,
    data: undefined
  }
    ilegal:Ilegal

  readonly api_url ='https://jsonplaceholder.typicode.com/todos/'
  readonly ilegal_url = 'https://jsonplaceholder.typicode.com/todos/'
  constructor(private http: HttpClient) {
    this.ilegal={
      cod_act_ilegal: 0,
      nombre: "",
      descripcion: "", 
      locacion: "", 
      dia_de_la_semana: 0, 
      hora_inicio: 0, 
      hora_fin: 0,
      estado: 0,
      cantidad_maxima: 0,
      reclusos : [],
      ilegales: []
}

  }
  
  getActividades() {
    return this.http.get<Actividad |JSON >(`${environment.API_URL}`+"actividades")
  } 

  getBusquedaParcial(nombre:string) {
      return this.http.get<Actividad|JSON >(`${environment.API_URL}`+"actividades/"+`${nombre}`)
  } 

  getBusquedaReclusos(cod_actividad:number) {
      return this.http.get<Actividad >(`${environment.API_URL}`+"actividades/reclusos/"+`${cod_actividad}`)
  }

  getOneActividad(id:any) {
    return this.http.get<Actividad>(`${environment.API_URL}`+"actividades/"+`${id}`)
  }
  RemoveOneActividad(id:any) {
    return this.http.delete<string|any>(`${environment.API_URL}`+"actividades/"+`${id}`)
  }
  postActividad(uActual:any){
    //console.log("actividad a enviar", uActual)
    uActual.hora_inicio =  parseInt(uActual.hora_inicio.substring(0, 2))
    uActual.hora_fin =  parseInt(uActual.hora_fin.substring(0, 2)) 
    uActual.cod_sector = parseInt(uActual.cod_sector)
    uActual.dia_de_la_semana = parseInt(uActual.dia_de_la_semana)
    return this.http.post<Actividad| JSON>(`${environment.API_URL}`+"actividades",uActual)
  }
  putActividad(id:any,uActual:Actividad){
    return this.http.put<Actividad| JSON>(`${environment.API_URL}`+"actividades/"+`${id}`,uActual)
  }


  ///////ILEGALES/////////
  getIlegales() {
    return this.http.get<Ilegal>(`${environment.API_URL}`+"actividades_ilegales")
  }
  getBusquedaParcialILEGAL(nombre:string) {
      return this.http.get<Ilegal>(`${environment.API_URL}`+"actividades_ilegales/"+`${nombre}`)
  } 

  getBusquedaReclusosILEGAL(cod_actividad:number) {
      return this.http.get<Actividad >(`${environment.API_URL}`+"actividades_ilegales/reclusos/"+`${cod_actividad}`)
  }

  getOneIlegal(id:any) {

    return this.http.get<Ilegal>(`${environment.API_URL}`+"actividades_ilegales/"+`${id}`)
  }
  postIlegal(uActual:any){
  
    uActual.dia_de_la_semana=Number.parseInt(uActual.dia_de_la_semana)
    return this.http.post<Ilegal| any>(`${environment.API_URL}`+"actividades_ilegales",uActual)
  }
  putIlegal(id:any,uActual:Ilegal){
    return this.http.put<Ilegal| any>(`${environment.API_URL}`+"actividades_ilegales/"+`${id}`,uActual)
  }

  RemoveOneActividadILEGAL(id:any) {
    return this.http.delete<string|any>(`${environment.API_URL}`+"actividades_ilegales/"+`${id}`)
  }

  InscribirActividadIlegal(actividad:any,recluso:any){
    let respuesta={
      cod_act_ilegal:actividad
      ,cod_recluso:recluso
    }
    return this.http.post<Ilegal| any>(`${environment.API_URL}`+"actividades_ilegales/inscripcion/"+`${actividad}`+"&"+`${recluso}`,respuesta)
  }
}



