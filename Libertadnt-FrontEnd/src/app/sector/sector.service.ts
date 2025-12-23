import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Celda } from '../interfaces/celda-interface.js';
import { Turno } from '../interfaces/turno-interface.js';
import { Sector} from '../interfaces/sector-interface.js';


@Injectable({
  providedIn: 'root'
})
export class SectorService {

  readonly api_url ='https://jsonplaceholder.typicode.com/posts'
  readonly celda_url ='https://jsonplaceholder.typicode.com/users/'
messageService: any;
sectores:any[]
sector:Sector
celda:Celda
turno:Turno
constructor(
private http: HttpClient) {
  this.sector={
    cod_sector:0,
    nombre: '',
    descripcion: '', 
    turnos: [] ,
    sentencias: [] ,
    actividades: [],
    sectores: []
  }
  this.sectores= []
  this.celda={
        cod_celda:0,
        cod_sector:0,
        descripcion : '',
        capacidad: 0,
        reclusos: [], 
        celdas: []
     }
  this.turno ={
    cod_guardia: {
      cod_guardia: 0,
      nombre: '',
      apellido: '',
      dni: 0,
      fecha_ini_contrato: null,
      fecha_fin_contrato: null,
      turnos: null
    },
    cod_sector: {
      cod_sector: 0,
      nombre: '',
      descripcion: '',
      turnos: null,
      sentencias: null,
      actividades: null,
      sectores: []
    },
    turno: '',
    turnos: []
  }

 }  
private log(message: string) {
  this.messageService.add(`GuaridaService: ${message}`);
}
getSectores() {
  return this.http.get<Sector>(`${environment.API_URL}`+"sectores")
  
}
getOneSector(id:any) {
  return this.http.get<Sector>(`${environment.API_URL}`+"sectores/"+`${id}`)
}
postSector(uActual:any){
  return this.http.post<any| JSON>(`${environment.API_URL}`+"sectores",uActual)
}
getCeldasDSeSector(id:any) {
  return this.http.get<Celda>(`${environment.API_URL}`+"sectores/celdas/"+`${id}`)
  
}
getTuenosDSeSector(cod_sector:any) {
  return this.http.get<Turno>(`${environment.API_URL}`+"turnos/"+`${cod_sector}`)
  
}
getOneCeldaDeSector(idSector:any,idCelda:any) {
  return this.http.get<Celda | JSON>(this.celda_url+`${idSector}`+`${idCelda}`)
}
postTurno(uActual:any){
  return this.http.post<any| JSON>(`${environment.API_URL}`+"turnos",uActual)
}
putBajaTurno(cod_guardia:any,cod_sector:any,turno:any){
  let respuesta={
    cod_guardia: cod_guardia,
    cod_sector: cod_sector,
    turno: turno}
  console.log(respuesta)
  return this.http.put<any | JSON>(`${environment.API_URL}`+"turnos",respuesta)
}



}
