import { Turno } from "./turno-interface.js";

export interface Guardia {
      cod_guardia: number
      nombre: string,
      apellido: string, 
      dni: number,
      fecha_ini_contrato: Date | null,
      fecha_fin_contrato: Date | null,
      turnos: Turno[] | null
}