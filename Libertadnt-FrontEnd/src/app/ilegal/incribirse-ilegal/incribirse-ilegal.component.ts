import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReclusosService } from '../../reclusos/reclusos.service.js';
import { ActividadService } from '../../actividades/actividad.service.js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-incribirse-ilegal',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './incribirse-ilegal.component.html',
  styleUrl: './incribirse-ilegal.component.css'
})
export class IncribirseIlegalComponent implements OnInit{
  constructor (public service : ActividadService,public sRecluso : ReclusosService, private modalService: NgbModal){
    this.cod_recluso= new FormControl('',[Validators.required,]);
  this.recluso = new FormGroup({
        cod_recluso:this.cod_recluso
      })    
      
  }
  open(content: any) {
    this.modalService.open(content, { centered: true });
  }
  ngOnInit(): void {
    this.service.getIlegales().subscribe({
      next:(data)=>{
        this.banana=true
        if(data){
          console.log("se recuperaron las actividades 201",data)
          this.service.ilegales=data.ilegales
          console.log(this.service.ilegales)
        }},
      error:(e)=>{
        if(e.status == 404){
          console.log("no se recuperaron las actividades",e)
        }
      }})
  }
  error:string=''
  recluso  : FormGroup;
  banana=false
  cod_recluso: FormControl;
  banderaRecluso:string|undefined
  inscriptos = []
  ingresarIsncripcion(x:any){
    if(x.inscripcion!== true ){x.inscripcion = true}
    else if(x.inscripcion == true){x.inscripcion=false}
    console.log(x)
  }
  validarRecluso(x:any){
    console.log("codigo de actividad" ,x)
    console.log("codigo de recluso" ,this.cod_recluso.value)
    this.service.InscribirActividadIlegal(x.cod_act_ilegal,this.cod_recluso.value).subscribe({
      next:(data)=>{
        console.log("data",data.status);
        if(data.status == 201){
          console.log("recluso inscripto ",data.status)
          this.banderaRecluso='inscripto'
        }
        if(data.status== 405){
          console.log("actividad no encontrada ",data.status)
          this.banderaRecluso='no encontrada'
        }
        if(data.status == 409){
          console.log("mensaje ", data ,data.message)
          this.error=data.error.message
          this.banderaRecluso='message'
        }
      },
      error:(e)=>{
        console.log("error ", e.status)
        if(e.status == 404){
          console.log("recluso no encontrado ",e.status)
          this.banderaRecluso='no inscripto'
        }
        if(e.status == 409){
          console.log("mensaje ", e , e.message)
          this.error=e.error.message
          this.banderaRecluso='message'
        }
        if(e.status== 405){
          console.log("actividad no encontrada ",e.status)
          this.banderaRecluso='no encontrada'
        }
        }})
      this.recluso.reset();
      }
      
    }
    

    
 
  
