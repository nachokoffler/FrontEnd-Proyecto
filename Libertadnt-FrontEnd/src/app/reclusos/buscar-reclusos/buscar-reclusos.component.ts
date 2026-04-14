import { Component } from '@angular/core';
import { ReclusosService } from '../reclusos.service.js';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

// Validador personalizado a nivel del grupo
function alMenosUnCampo(control: AbstractControl): ValidationErrors | null {
  const nombre = control.get('nombre')?.value;
  const apellido = control.get('apellido')?.value;

  if (!nombre && !apellido) {
    return { alMenosUno: true }; 
  }
  return null; 
}

@Component({
  selector: 'app-buscar-reclusos',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './buscar-reclusos.component.html',
  styleUrl: './buscar-reclusos.component.css'
})
export class BuscarReclusosComponent {

  recluso: FormGroup;
  nombre: FormControl;
  apellido: FormControl;
  cod_recluso: FormControl;
  dni: FormControl;
  bandera: boolean | undefined;

  constructor(public service: ReclusosService) {
    this.cod_recluso = new FormControl('');
    this.nombre = new FormControl('');
    this.apellido = new FormControl('');
    this.dni = new FormControl('');

    this.recluso = new FormGroup({
      nombre: this.nombre,
      cod_recluso: this.cod_recluso,
      apellido: this.apellido,
      dni: this.dni
    }, { validators: alMenosUnCampo });
  }

  getFecha(fecha_nac: string): string {
    const fecha = new Date(fecha_nac);
    return `${fecha.getDate()} / ${fecha.getMonth() + 1} / ${fecha.getFullYear()}`;
  }

  validarRecluso() {
    
    this.service.getBusquedaParcial(this.nombre.value, this.apellido.value).subscribe({
      next: (data) => {
        if (data.status == 201) {
          
          console.log("reclusos encontrados", data);
          this.service.reclusos = data;
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

    this.recluso.reset();
  }
}

function elif(arg0: boolean) {
  throw new Error('Function not implemented.');
}
