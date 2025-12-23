import { Component, OnInit } from '@angular/core';
import { SectorService } from '../sector.service.js';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-crear-turnos',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './crear-turnos.component.html',
  styleUrl: './crear-turnos.component.css'
})
export class CrearTurnosComponent implements OnInit {
  constructor (public service : SectorService,public route: ActivatedRoute){
    console.log(route)
    let codi_sector=this.route.snapshot.params['sector']
    this.cod_guardia= new FormControl('',[Validators.required,Validators.maxLength(30)]);
    this.turno= new FormControl('',[Validators.required,Validators.maxLength(30)]);
    this.cod_sector= new FormControl('');
    this.nuevo_turno = new FormGroup({
      cod_guardia: this.cod_guardia,
      turno: this.turno,
      cod_sector: this.cod_sector
      })
  } //const cod =  Number.parseInt(req.params.cod)
  atras:string|undefined
  link:any

  ngOnInit(): void {
    console.log(this.route.snapshot.params['sector'])
    this.atras=this.route.snapshot.params['sector']
    this.link= "/usuario/menu/sector/t/"+`${this.atras}`
  }
    nuevo_turno  : FormGroup;
    cod_guardia: FormControl;
    turno: FormControl;
    cod_sector:FormControl

    bandera:string |undefined
    crearTurno(){
      console.log(this.route.snapshot.params['sector'])
      this.nuevo_turno.value.cod_sector=Number.parseInt(this.route.snapshot.params['sector'])
      console.log(this.nuevo_turno.value.cod_sector)
      console.log(this.nuevo_turno.value)
      this.service.postTurno(this.nuevo_turno.value).subscribe({
        next:(data)=>{
          if(data.status == 201){
            console.log("EL TURNO SE CREO EXITOSAMENTE")
            this.bandera='exito'
          }
        },
        error:(e)=>{
          if(e.status==409){
            console.log("el guardia esta ocupado en ese momento")
            this.bandera='ocupado'
          }
          if(e.status==404){
            console.log("el guardia no se encontro")
            this.bandera= 'no encontrado'
          }
        }
        })}
        
}
