import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GuardiasService } from '../guardias.service.js';

@Component({
  selector: 'app-alta-guardia',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './alta-guardia.component.html',
  styleUrl: './alta-guardia.component.css'
})

export class AltaGuardiaComponent {
  constructor (public service : GuardiasService){
    this.dni= new FormControl('',[Validators.required,Validators.maxLength(30)]);
    this.nombre= new FormControl('',[Validators.required,]);
    this.apellido= new FormControl('',[Validators.required,]);
    
  
    this.guardia = new FormGroup({

      nombre: this.nombre,
      dni: this.dni,
      apellido: this.apellido,
      
      })}
    
  guardia : FormGroup;
  nombre : FormControl;
  apellido : FormControl;
  dni: FormControl;
  bandera: undefined| string
  error: any=''
  
  enviarGuarida(){
    this.bandera=undefined
    this.service.guardia=this.guardia.value
    console.log(this.service.guardia)
    this.service.postGuardia(this.service.guardia).subscribe({
      next:(data)=>{
        if(data){
          this.bandera='contratado'
          console.log(data)
          console.log(data.cod_guardia)
          this.service.guardia.cod_guardia = data.cod_guardia 
        }
      },
      error:(e)=>{
        if(e.status === 409){
          console.log("el guardia ya existe y se encuentra con contrato activo")
          this.bandera = 'activo'
          console.log(e)
        }
        if(e.status === 400){
          console.log("error de msj")
          this.error=e.error.message
          this.bandera = 'msj'
          console.log(e)
        }
      }
    })
      this.guardia.reset()
  }


}
