import { Component, OnInit } from '@angular/core';
import { GuardiasService } from '../guardias.service.js';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mostrar-guardia',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mostrar-guardia.component.html',
  styleUrl: './mostrar-guardia.component.css'
})
export class MostrarGuardiaComponent implements OnInit {

  guardias: any = [];

  constructor(public service: GuardiasService) {}

  ngOnInit(): void {
    this.traerGuardias();
  }

  traerGuardias() {
    this.service.getGuardias().subscribe({
      next: (data) => {
        if (data) {
          console.log("guardias cargados, 201", data);
          this.service.guardias = data;
        }
      },
      error: (e) => {
        if (e.status === 404) {
          console.log("guardias no existentes", e);
        }
      }
    });
  }

  eliminar(item: any) {
  this.service.putFinalizarGuardia(item).subscribe({
    next: (data) => {
      if (data) {
        console.log("guardia finalizado", data);
        this.service.guardias = data;
        this.traerGuardias(); 
      }
    },
    error: (e) => {
      if (e.status === 404) {
        console.log("guardia no existente", e);
      }
    }
  });
}

  

}