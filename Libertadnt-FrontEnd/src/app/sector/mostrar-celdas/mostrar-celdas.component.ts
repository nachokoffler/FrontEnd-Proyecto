import { Component, OnInit } from '@angular/core';
import { SectorService } from '../sector.service.js';
import { ActivatedRoute,  } from '@angular/router';

@Component({
  selector: 'app-mostrar-celdas',
  standalone: true,
  imports: [],
  templateUrl: './mostrar-celdas.component.html',
  styleUrl: './mostrar-celdas.component.css'
})
export class MostrarCeldasComponent implements OnInit {
  constructor (public service : SectorService,public route: ActivatedRoute){
    let cod_sector = route.snapshot.params['sector'];
    console.log(route)
  }
  
  ngOnInit(): void {
    console.log(this.route.snapshot.params['sector'])
    this.service.getCeldasDSeSector(this.route.snapshot.params['sector']).subscribe({
      next:(data)=>{
        this.service.celda.celdas=data.celdas;
        console.log("devolucion ",data)
      },
      error:(e)=>{console.log(e)}})
  }
}


