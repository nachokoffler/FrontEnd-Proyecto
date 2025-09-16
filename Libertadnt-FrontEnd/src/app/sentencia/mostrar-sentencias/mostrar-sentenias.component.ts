import { Component, OnInit } from '@angular/core';
import { SentenciasService } from '../sentencias.service.js';
import { FormsModule } from '@angular/forms';
import { Sentencia } from '../../interfaces/sentencia-interface.js';

@Component({
  selector: 'app-mostrar-sentenias',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mostrar-sentencias.component.html',
  styleUrl: './mostrar-sentencias.component.css'
})
export class MostrarSenteniasComponent implements OnInit {
 
  constructor (public service : SentenciasService){}
    ngOnInit(): void {
      this.service.getSentencias().subscribe({
        next: (data)=> {
          if(data){
            this.service.sentencia = data
            console.log("sentencias obteidas",this.service.sentencia)
          }
        },
        error: (e) => {
          if(e.status== 404){
            console.log("no se pudo obtener las sentencias",e)
          }
        }
      })
    }
  id = '';
  ban = false;
  
  
   uno ={
     cod_sentencia: 0,
     nombre: '',
     descripcion: '',
     duracion_anios: '',
     orden_de_gravedad: '',
     cod_recluso: 0
   } ;
  validarband(){
    if(this.id !!= ''){
      this.ban = true;
    }
    console.log(this.id)
  }
  
  buscarSentencias(){
    this.service.getSentencias().subscribe({
      next: (respuesta)=> {this.service.sentencia = respuesta},
      error: (e) => {console.log(e)}
    })
    
  }

  buscarUnaSentencia(id:any){
    this.service.getOneSentencias(id).subscribe({
      next: (respuesta)=> {this.service.sentencia = respuesta},
      error: (e) => {console.log(e)}}
    )

  }

}
