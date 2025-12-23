import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { SectorService } from '../sector.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-turnos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu-turnos.component.html',
  styleUrl: './menu-turnos.component.css'
})
export class MenuTurnosComponent implements OnChanges {
  constructor (public service : SectorService,public route: ActivatedRoute){
    let codi_sector = route.snapshot.params['sector'];
    console.log(route)
    service.sector.cod_sector=codi_sector
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.cargarDatos();
  }

  finalizar:string|undefined
  crear:string|undefined
  bandera:boolean|undefined
  eliminado:string|undefined
  sector:any
  link:any

  ngOnInit(): void {
    this.cargarDatos();
  }

  // Función centralizada para cargar datos
  cargarDatos(): void {
    console.log(this.route.snapshot.params['sector'])
    this.sector=this.route.snapshot.params['sector']
    this.crear="crear-turnos"
    this.finalizar="finalizar-turnos"
    this.link= "/usuario/menu/sector/t/"+`${this.sector}`+"/crear-turnos"
    
    this.service.getTuenosDSeSector(this.route.snapshot.params['sector']).subscribe({
      next:(data)=>{
        console.log( "esta es la data ", data)
        if(data){
          console.log("turnos obtenidos  status == 201")
          console.log("devolucion ",data)
          this.service.turno.turnos=data.turnos;
          console.log("devolucion ",data)
          this.bandera= true
        }
      },
      error:(e)=>{
        console.log(e)
        if(e.status == 409){
          console.log("turnos no obtenidos",e)
          this.bandera= false
        }
      }
    });
  }

  finalizarTurno(cod_guardia:any, Turno:any){
    console.log("baja turno : ", cod_guardia, this.service.sector.cod_sector, Turno)
    this.service.putBajaTurno(cod_guardia.cod_guardia, this.service.sector.cod_sector, Turno).subscribe({
      next:(data)=>{
        console.log("estatus:",data.status)
        if(data.status == 201){
          console.log("el turno se borro correctamente")
          this.eliminado='exito'
          // 🔄 REFRESCAR LOS DATOS después de eliminar
          this.cargarDatos();
        }
      },
      error:(e)=>{
        console.log("estatus:",e.status)
        if(e.status==409){
          console.log("no existe turno ")
          this.eliminado='no turno'
        }
        if(e.status==404){
          console.log("no existe turno ")
          this.eliminado='no guardia'
        }
        // También recargar en caso de error para mantener consistencia
        this.cargarDatos();
      }
    });
  }
}