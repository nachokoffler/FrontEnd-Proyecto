import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../../actividades/actividad.service.js';
import { Ilegal } from '../../interfaces/ilegal-interface.js';

@Component({
  selector: 'app-mostrar-ilegal',
  standalone: true,
  imports: [],
  templateUrl: './mostrar-ilegal.component.html',
  styleUrl: './mostrar-ilegal.component.css'
})
export class MostrarIlegalComponent implements OnInit{
  constructor(public service: ActividadService){}
  banana = false
  ngOnInit(): void {
    this.service.getIlegales().subscribe({
      next:(data)=>{
        this.service.ilegal.ilegales = data.ilegales
        this.banana=true
      },
      error:(e)=>{console.log(e)}})
  }
  
}
