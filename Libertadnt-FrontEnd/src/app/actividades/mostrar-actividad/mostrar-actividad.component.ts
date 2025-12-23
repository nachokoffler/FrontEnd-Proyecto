import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../actividad.service.js';

@Component({
  selector: 'app-mostrar-actividad',
  standalone: true,
  imports: [],
  templateUrl: './mostrar-actividad.component.html',
  styleUrl: './mostrar-actividad.component.css'
})
export class MostrarActividadComponent implements OnInit{
  constructor (public service : ActividadService){}
  bandera:undefined|boolean
  ngOnInit(): void {
    this.service.getActividades().subscribe({
      next:(data)=>{
        if(data){
          this.service.actividades=data
          console.log("actividades encontradas", data)
          this.bandera = true
        }
      },
      error:(e)=>{
        if(e.status === 404){
          this.bandera = false
          console.log("actividades no encontradas", e)
        }
      }
    })
  }
}
