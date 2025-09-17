import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReclusosService } from '../reclusos.service.js';
import { SentenciasService } from '../../sentencia/sentencias.service.js';
import { Sentencia } from '../../interfaces/sentencia-interface.js';
import { Data } from '@angular/router';

@Component({
  selector: 'app-alta-reclusos',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './alta-reclusos.component.html',
  styleUrl: './alta-reclusos.component.css'
})
export class AltaReclusosComponent implements OnInit{
  constructor (public service : ReclusosService,public sSentencia : SentenciasService){
    this.fecha_nac= new FormControl('',[Validators.required,]);
    this.nombre= new FormControl('',[Validators.required,Validators.maxLength(40),Validators.minLength(1)]);
    this.apellido= new FormControl('',[Validators.required,Validators.maxLength(40),Validators.minLength(1)]);
    this.dni= new FormControl('',[Validators.required,]);
    this.cod_sentencia = new FormControl('',)
  
  
  this.recluso = new FormGroup({
    nombre:this.nombre ,
    apellido: this.apellido, 
    dni: this.dni,
    fecha_nac:this.fecha_nac   
  })
  this.condena =new FormGroup({
    cod_sentencia:this.cod_sentencia
  })
  
}
  ngOnInit(): void {
    this.sSentencia.getSentencias().subscribe({
      next:(data)=>{
        console.log(this.sSentencia.sentencias)
        this.sSentencia.sentencias=data
        console.log("sentencias obtenidas")
        console.log(this.sSentencia.sentencias)
        
      },
      error:(e)=>{
        console.log("error en cargar sentencias")
        
      }})
  }

  celda={cod_celda:0,cod_sector:0}
  banana:string | undefined
  recluso  : FormGroup;
  nombre : FormControl;
  apellido : FormControl;
  fecha_nac: FormControl;
  cod_sentencia: FormControl;
  dni: FormControl;
  bandRecluso :string | undefined
  bandCelda :boolean | undefined
  condena: FormGroup;
  respuesta:any = []
  value:string|undefined
  cod_rec: number =0


validarRecluso(){ 
  console.log(this.recluso.value)
  this.service.postRecluso(this.recluso.value).subscribe({
    next: (data)=>{
      console.log("status",data.status)

      this.cod_rec = data.data
      if(data.status == 201){
        console.log("recluso creado")
        this.service.recluso = data
        this.bandRecluso = 'exito'
      }
      if(data.status == 202 ) {
        console.log("recluso existente")
        this.bandRecluso= 'exito'      
      }
      if(data.status == 203){
        console.log("recluso tiene condena activa")
        this.bandRecluso='activa'
      }
    },
    error: (e)=>{
      if(e.status == 203){
        console.log("recluso tiene condena activa")
        this.bandRecluso='activa'
      }
      if(e.status == 400){
        console.log("la respuesta es",e)
        console.log("el mensaje es:",e.error.message)
        this.banana=e.error.message
        this.bandRecluso='message'
      }
    }
  })
}

enviarCondena(){
  let sentencia_enviar={
    cod_recluso: this.cod_rec,
    cod_sentencia: this.respuesta
  }
  console.log(sentencia_enviar)
  this.service.postCondena(sentencia_enviar).subscribe({
    next:(data)=>{
      if(data){
        console.log( "response:",data)
        console.log("condena posteada status == 201")
        this.bandRecluso = 'celda'
        this.celda= data
      }
    },
    error:(e)=>{
      if(e.status == 409){
        console.log("no hay cupo para las sentencias de la condena")
        this.bandRecluso = 'sentencia'
      }
    }})
    this.bandRecluso = undefined
    this.recluso.reset()
}

agregarSentencia(sent:any){
  if(this.validarSentencia(sent)){
    this.respuesta.push(sent)
    this.value='true'
  }else{
    this.respuesta.splice(this.respuesta.findIndex((item: any)=>{item == sent}),1)
    this.value='false'
  }
  
}
validarSentencia(sent:any){
  let encontrado = this.respuesta.find((x:any)=>x == sent)
  console.log(encontrado)
  if(encontrado == undefined){
    return true
  }
  return false
}

}

