import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../actividad.service.js';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modificar-actividad',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './modificar-actividad.component.html',
  styleUrl: './modificar-actividad.component.css'
})
export class ModificarActividadComponent implements OnInit{
  constructor (public service : ActividadService){ }
  ngOnInit(): void {
    this.service.getActividades().subscribe({
      next:(data)=>{
        if(data){
          console.log("actividades encontrados status == 201")
          this.service.actividades=data
          this.bandera=true
          console.log(this.service.actividades)
        }},
      error:(e)=>{
        if(e.status == 404){
          console.log("administradores no encontrados")
          this.bandera= false
        }
        }})
  }
  bandera:boolean | undefined

  eliminar(item: any) {
  this.service.RemoveOneActividad(item.cod_actividad).subscribe({
      next:(data)=>{
        if(data){
          console.log("administradores encontrados status == 201")
          this.service.actividades=data
          this.bandera=true
          console.log(this.service.actividades)
        }},
      error:(e)=>{
        if(e.status == 404){
          console.log("administradores no encontrados")
          this.bandera= false
        }
        }})
}

recargar() {
  window.location.reload();
}
  

}

