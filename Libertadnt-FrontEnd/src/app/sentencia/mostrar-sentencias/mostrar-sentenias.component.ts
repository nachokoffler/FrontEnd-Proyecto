import { Component, OnInit } from '@angular/core';
import { SentenciasService } from '../sentencias.service.js';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mostrar-sentenias',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mostrar-sentencias.component.html',
  styleUrl: './mostrar-sentencias.component.css'
})
export class MostrarSenteniasComponent implements OnInit {
  constructor (public service : SentenciasService){}
  bandera: boolean | undefined
    ngOnInit(): void {
      this.service.getSentencias().subscribe({
        next: (data)=> {
          if(data){
            this.service.sentencia = data
            //console.log("sentencias obteidas",this.service.sentencia)
          }
        },
        error: (e) => {
          if(e.status== 404){
            console.log("no se pudo obtener las sentencias", e)
          }
        }
      })

      let usuario = sessionStorage.getItem("usuario");
      console.log("usuario: ", usuario)


    }
  id = '';
  ban = false;
  uno = {
    cod_sentencia: 0,
    nombre: '',
    descripcion: '',
    duracion_anios: '',
    orden_de_gravedad: '',
    cod_recluso: 0
  };
  validarband(){
    if(this.id !!= ''){
      this.ban = true;
    }
    //console.log(this.id)
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
  recargar() {
  window.location.reload();
  }

  eliminar(item: any) {
  this.service.eliminarSentencia(item.cod_sentencia).subscribe({
    next: (res) => {
      console.log('Sentencia eliminada', res);
    },
    error: (err) => {
      console.error('Error al eliminar', err);
    }
  });
  }

}
