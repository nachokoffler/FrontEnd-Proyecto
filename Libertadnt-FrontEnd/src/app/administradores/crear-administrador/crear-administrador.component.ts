import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdministradorService } from '../administrador.service.js';

@Component({
  selector: 'app-crear-administrador',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './crear-administrador.component.html',
  styleUrl: './crear-administrador.component.css'
})
export class CrearAdministradorComponent {
  constructor(public service: AdministradorService) {
    this.dni = new FormControl('',[Validators.required]);
    this.nombre = new FormControl('',[Validators.required]);
    this.apellido = new FormControl('',[Validators.required]);
    this.email = new FormControl('',[Validators.required]);
    this.es_especial = new FormControl(false,[Validators.required]);
    this.administrador = new FormGroup({
      dni: this.dni,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      es_especial: this.es_especial
    });
  }
  dni:FormControl;
  nombre:FormControl;
  apellido:FormControl;
  email:FormControl;
  es_especial: FormControl; 
  administrador: FormGroup;
  bandera:string = '';

  crearAdministrador(){
    if(this.administrador.valid){
      this.service.postAdministrador(this.administrador.value).subscribe({
        next: (data) => {
          console.log(data);
          this.bandera = 'Administrador creado exitosamente';
        },
        error: (error) => {
          console.error(error);
          this.bandera = 'Error al crear el administrador';
        } 
      });
    }

  }
}




