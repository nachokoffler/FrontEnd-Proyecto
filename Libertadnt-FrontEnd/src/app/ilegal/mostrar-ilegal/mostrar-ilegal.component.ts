import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../../actividades/actividad.service.js';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mostrar-ilegal',
  standalone: true,
  // Es vital importar ReactiveFormsModule y CommonModule para que funcionen los formularios y pipes
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './mostrar-ilegal.component.html',
  styleUrl: './mostrar-ilegal.component.css'
})
export class MostrarIlegalComponent implements OnInit {
  
  ilegalForm: FormGroup;
  bandera: boolean = false;
  banana: boolean = false;
  reclusosActividad: any[] = [];

  constructor(public service: ActividadService) {
    // Inicializamos el formulario
    this.ilegalForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(30)])
    });
  }

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades(): void {
    this.service.getIlegales().subscribe({
      next: (data) => {
        // Sincronizamos con la variable que usa el HTML
        this.service.ilegal.ilegales = data.ilegales;
        this.banana = true;
        this.bandera = data.ilegales.length > 0;
        console.log("Datos cargados:", data);
      },
      error: (e) => console.error("Error al cargar:", e)
    });
  }

  buscarPorNombre() {
    const nombreBusqueda = this.ilegalForm.get('nombre')?.value;
    console.log("Buscando:", nombreBusqueda);

    this.service.getBusquedaParcialILEGAL(nombreBusqueda).subscribe({
      next: (data) => {
        // IMPORTANTE: Usamos la misma ruta que en el ngOnInit
        this.service.ilegal.ilegales = data.ilegales;
        this.bandera = data.ilegales.length > 0;
      },
      error: (e) => {
        console.error("Error en búsqueda:", e);
        this.bandera = false;
      }
    });
  }

  buscarRecluso(cod_actividad: number) {
    this.service.getBusquedaReclusos(cod_actividad).subscribe({
      next: (data) => {
        this.reclusosActividad = data.data.reclusos;
      },
      error: (e) => console.error("Error al buscar reclusos:", e)
    });
  }

  eliminar(item: any) {
    this.service.RemoveOneActividadILEGAL(item.cod_act_ilegal).subscribe({
      next: () => console.log("Eliminado con éxito"),
      error: (e) => console.error("Error al eliminar", e)
    });
  }

  recargar() {
    this.cargarActividades(); // Es mejor recargar los datos que toda la página
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return 'N/A';
    const f = new Date(fecha);
    return `${f.getDate().toString().padStart(2, '0')}/${(f.getMonth() + 1).toString().padStart(2, '0')}/${f.getFullYear()}`;
  }
}