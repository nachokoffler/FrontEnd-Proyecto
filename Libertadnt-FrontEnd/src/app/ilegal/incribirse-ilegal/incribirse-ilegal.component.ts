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
    this.cod_recluso= new FormControl('',);
    this.nombre= new FormControl('',);
    this.apellido= new FormControl('',);
  this.recluso = new FormGroup({
        cod_recluso:this.cod_recluso,
        nombre:this.nombre,
        apellido:this.apellido
      })
    this.busquedaRecluso = new FormGroup({
        nombre: new FormControl('', [Validators.required]),
        apellido: new FormControl('', [Validators.required])
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
  nombre: FormControl ;
  apellido: FormControl ;
  recluso  : FormGroup;
  busquedaRecluso: FormGroup;
  banana=false
  bandPacrcial:boolean|undefined
  cod_recluso: FormControl;
  banderaRecluso:string|undefined
  inscriptos = []
  reclusosFiltrados: any[] = []
  reclusoSeleccionado: any = null
  
  ingresarIsncripcion(x:any){
    if(x.inscripcion!== true ){x.inscripcion = true}
    else if(x.inscripcion == true){x.inscripcion=false}
    console.log(x)
  }

  cambiarBandera(){
    this.banderaRecluso= undefined
  }
  
  buscarReclusos(){
    console.log("Buscando reclusos con nombre:", this.nombre.value, "y apellido:", this.apellido.value);
    this.sRecluso.getBusquedaParcial(this.nombre.value, this.apellido.value).subscribe({
      next:(data)=>{
        console.log("Reclusos encontrados:", data);
        this.reclusosFiltrados = data.data ;
        this.bandPacrcial=true
        this.recluso.reset()
      },
      error:(e)=>{
        console.log("Error en búsqueda:", e);
        this.reclusosFiltrados = [];
        this.bandPacrcial=false
      }
    });
  }

  seleccionarRecluso(recluso: any){
    this.reclusoSeleccionado = recluso;
    console.log("Recluso seleccionado:", recluso);
  }

  confirmarSeleccionRecluso(item: any){
    if(!this.reclusoSeleccionado){
      this.error = "Debe seleccionar un recluso";
      return;
    }
    
    this.service.InscribirActividadIlegal(item.cod_act_ilegal, this.reclusoSeleccionado.cod_recluso).subscribe({
      next:(data)=>{
        console.log("data",data.status);
        if(data.status == 201){
          console.log("recluso inscripto ",data)
          this.banderaRecluso='inscripto'
          this.error=data.message
          console.log("mensaje: ",data.message)
        }
        if(data.status== 405){
          console.log("actividad no encontrada ",data.status)
          this.banderaRecluso='no encontrada'
        }
        if(data.status == 409){
          console.log("mensaje ", data ,data.message)
          this.error=data.message
          this.banderaRecluso='message'
        }
      },
      error:(e)=>{
        console.log("error ", e.status)
        if(e.status == 404){
          console.log("recluso no encontrado ",e.status,e.error.message )
          this.banderaRecluso='no inscripto'
          this.error=e.error.message
        }
        if(e.status == 409){
          console.log("mensaje ", e , e.message)
          this.error=e.error.message
          this.banderaRecluso='message'
        }
        if(e.status== 405){
          console.log("actividad no encontrada ",e.status)
          this.banderaRecluso='no encontrada'
          this.error=e.error.message
        }
        }})
      this.busquedaRecluso.reset();
      this.reclusoSeleccionado = null;
      this.reclusosFiltrados = [];
  }
  
    }
    

    
 
  
