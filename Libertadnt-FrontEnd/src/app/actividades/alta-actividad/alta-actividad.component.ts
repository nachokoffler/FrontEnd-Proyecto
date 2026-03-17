import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActividadService } from '../actividad.service.js';


@Component({
  selector: 'app-alta-actividad',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './alta-actividad.component.html',
  styleUrl: './alta-actividad.component.css'
})
export class AltaActividadComponent {
number: any;
  constructor (private service : ActividadService){
    this.nombre= new FormControl('',[Validators.required,Validators.maxLength(30)]);
    this.cod_sector= new FormControl('',[Validators.required]);
    this.descripcion= new FormControl('',[Validators.required,]);
    this.locacion= new FormControl('',[Validators.required,]);
    this.hora_inicio= new FormControl('00:00',[Validators.required,]);
    this.hora_fin = new FormControl('00:00',[Validators.required,]);
    this.dia_de_la_semana = new FormControl(0,[Validators.required])
    this.cantidad_minima= new FormControl('',[Validators.required,]);
    this.edad_minima= new FormControl('',[Validators.required,]);

  
    this.actividad = new FormGroup({
      nombre: this.nombre,
      descripcion: this.descripcion,
      locacion: this.locacion,
      hora_inicio: this.hora_inicio,
      hora_fin: this.hora_fin,
      dia_de_la_semana:this.dia_de_la_semana,
      cantidad_minima:this.cantidad_minima,
      edad_minima:this.edad_minima,
      cod_sector:this.cod_sector
    })      
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
  bandActividad: string | undefined
  mensaje: string | undefined

  validarActividad(){
    this.service.postActividad(this.actividad.value).subscribe({
      next:(data)=>{
        if(data){
          console.log("actvidad posteada status == 201")
          this.bandActividad = 'exito'
        }
      },
      error:(e)=>{
        if(e.status == 409){
          console.log("la actividad es superpuesta error 409")
          this.bandActividad = 'superpuesta'
          this.mensaje = e.error.message
        }
        else if(e.status == 400){
          this.mensaje = e.error.message
          console.log("la actividad es superpuesta error 400")
          this.bandActividad = 'otro error'
        }
      }
    })
    this.actividad.reset() 
  }
}
  




