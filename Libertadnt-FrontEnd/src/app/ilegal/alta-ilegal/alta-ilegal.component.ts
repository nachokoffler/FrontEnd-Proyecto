import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActividadService } from '../../actividades/actividad.service.js';

@Component({
  selector: 'app-alta-ilegal',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './alta-ilegal.component.html',
  styleUrl: './alta-ilegal.component.css'
})
export class AltaIlegalComponent {
  constructor(private service : ActividadService){
    this.decripcion= new FormControl('',[Validators.required, Validators.maxLength(100),Validators.minLength(1)]);
    this.locacion= new FormControl('',[Validators.required,Validators.maxLength(60),Validators.min(1)]);
    this.dia_de_la_semana = new FormControl('',)
    this.cantidad_maxima= new FormControl('',[Validators.required,]);
    this.nombre= new FormControl('',[Validators.required,Validators.maxLength(60),Validators.minLength(8)]);
    this.hora_inicio= new FormControl('',[Validators.required,Validators.maxLength(2)]);
    this.hora_fin= new FormControl('',[Validators.required,Validators.maxLength(2)]);
    
      
      
    
    
    this.ilegal = new FormGroup({
      nombre: this.nombre,
      descripcion: this.decripcion, 
      locacion: this.locacion, 
      dia_de_la_semana: this.dia_de_la_semana, 
      hora_inicio: this.hora_inicio, 
      hora_fin: this.hora_fin,
      cantidad_maxima: this.cantidad_maxima
    },Validators.required)
  }
  ilegal  : FormGroup;
  nombre:FormControl
  decripcion : FormControl;
  locacion : FormControl;
  //cod_actividad: FormControl;
  dia_de_la_semana: FormControl;
  banana: string | undefined
  cantidad_maxima: FormControl;
  hora_inicio:FormControl;
  hora_fin:FormControl;


  bandera:string |undefined;
  validarActividad(){
    console.log(this.hora_inicio.value)
    console.log(this.ilegal.value)
    this.service.postIlegal(this.ilegal.value).subscribe({
      next:(data)=>{
        console.log(data.status)
      if(data == 201){
        console.log("la actividad fue enviada")}
        console.log("paso por el post", data.status)
        this.bandera='correcto'
      
      if(data.status == 409){
        console.log("actividad ya existente ")
        this.bandera='existente'
      }},
      error:(e)=>{
        console.log(e.status)
        if(e.status == 404){
          console.log("error al postear")
          this.bandera='error'
        }
        if(e.status == 400){
          this.bandera='mensaje'
          this.banana=e.error.message
        }
        if(e.status == 409){
          console.log("actividad ya existente ")
          this.bandera='existente'
        }
      }})
  }
  /*TranformarDia(x: any){
    this.ilegal.value.dia_de_la_semana = x
    console.log("dia cambiado a ",this.dia_de_la_semana , this.ilegal.value)
  }*/

}
