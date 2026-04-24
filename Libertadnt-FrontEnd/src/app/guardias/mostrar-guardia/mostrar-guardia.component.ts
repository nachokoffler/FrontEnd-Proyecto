import { Component, OnInit } from '@angular/core';
import { GuardiasService } from '../guardias.service.js';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';

function alMenosUnCampo(control: AbstractControl): ValidationErrors | null {
  const nombre = control.get('nombre')?.value;
  const apellido = control.get('apellido')?.value;

  if (!nombre && !apellido) {
    return { alMenosUno: true }; 
  }
  return null; 
}



@Component({
  selector: 'app-mostrar-guardia',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule, ReactiveFormsModule],
  templateUrl: './mostrar-guardia.component.html',
  styleUrl: './mostrar-guardia.component.css'
})
export class MostrarGuardiaComponent implements OnInit {


  constructor(public service: GuardiasService) {
    this.nombre = new FormControl('');
    this.apellido = new FormControl('');
    this.dni = new FormControl('');

    this.guardia = new FormGroup({
      nombre: this.nombre,
      apellido: this.apellido,
      dni: this.dni
    }, { validators: alMenosUnCampo });

  }
  guardia: FormGroup;
  nombre: FormControl;
  apellido: FormControl;
  dni: FormControl;
  bandera: boolean | undefined;

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
 validarGuardia() {
    
    this.service.getBusquedaParcial(this.nombre.value, this.apellido.value).subscribe({
      next: (data) => {
        if (data.status == 201) {
          
          console.log("reclusos encontrados", data);
          this.bandera = true;
        }
      },
      error: (e) => {
        if (e.status === 404) {
          console.log("recluso no existente", e);
          this.bandera = false;
        }
      }
    });

  }

  

}