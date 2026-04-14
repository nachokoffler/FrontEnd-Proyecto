import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../actividad.service.js';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Actividad } from '../../interfaces/actividad-interface.js';

@Component({
  selector: 'app-mostrar-actividad',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './mostrar-actividad.component.html',
  styleUrl: './mostrar-actividad.component.css'
})
export class MostrarActividadComponent implements OnInit {

  constructor(public service: ActividadService) {
    this.nombre = new FormControl('', [Validators.required, Validators.maxLength(30)]);
    this.cod_sector = new FormControl('', [Validators.required]);
    this.descripcion = new FormControl('', [Validators.required]);
    this.locacion = new FormControl('', [Validators.required]);
    this.hora_inicio = new FormControl('00:00', [Validators.required]);
    this.hora_fin = new FormControl('00:00', [Validators.required]);
    this.dia_de_la_semana = new FormControl(0, [Validators.required]);
    this.cantidad_minima = new FormControl('', [Validators.required]);
    this.edad_minima = new FormControl('', [Validators.required]);

    this.actividad = new FormGroup({
      nombre: this.nombre,
     
    });
  }

  nombre: FormControl;
  actividad: FormGroup;
  descripcion: FormControl;
  locacion: FormControl;
  cod_sector: FormControl;
  dia_de_la_semana: FormControl;
  hora_inicio: FormControl;
  hora_fin: FormControl;
  cantidad_minima: FormControl;
  edad_minima: FormControl;
  bandera: undefined | boolean;
  textoBusqueda: string = '';
  reclusosActividad: any   ;
  

  ngOnInit(): void {
    this.service.getActividades().subscribe({
      next: (data) => {
        if (data) {
          this.service.actividades = data;
          console.log("actividades encontradas", data);
          this.bandera = true;
        }
      },
      error: (e) => {
        if (e.status === 404) {
          this.bandera = false;
          console.log("actividades no encontradas", e);
        }
      }
    });
  }

  buscarPorNombre() {
    console.log("nombre a buscar: ", this.nombre.value);
    this.service.getBusquedaParcial(this.nombre.value).subscribe({
      next: (data) => {
        console.log("busqueda: ", data);
        this.service.actividades = data;
        if (this.service.actividades.data.length > 0) {
          this.bandera = true;
        } else {
          this.bandera = false;
        }
      },
      error: (e) => {
        console.log("no encontrado", e);
        this.bandera = false; // 👈 si hay error también mostramos el cartel
      }
    });
  }

  eliminar(item: any) {
    this.service.RemoveOneActividad(item.cod_actividad).subscribe({
      next: (data) => {
        console.log("actividad eliminada");
        
      },
      error: (e) => {
        console.log("actividad no eliminada", e);
      }
    });
  }
  buscarRecluso(cod_actividad:number){
    this.service.getBusquedaReclusos(cod_actividad).subscribe({
      next: (data) => {
        console.log("reclusos obtenidos", data);
        this.reclusosActividad = data.data.reclusos
        console.log("reclusos?", data.data.reclusos)
        
      },
      error: (e) => {
        console.log("reclusos no obtenidos", e);
      }})
  }

  recargar() {
    window.location.reload();
  }
  formatearFecha(fecha: string): string {
  const f = new Date(fecha);
  return `${f.getDate().toString().padStart(2, '0')} / ${(f.getMonth() + 1).toString().padStart(2, '0')} / ${f.getFullYear()}`;
  }

}