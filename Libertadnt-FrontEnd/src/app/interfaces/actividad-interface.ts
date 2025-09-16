import { Recluso } from "./recluso-interface.js";
import { Sector } from "./sector-interface.js";

export interface Actividad {
    nombre: string,
    descripcion: string, 
    locacion: string, 
    dia_de_la_semana: number, 
    hora_inicio: string, 
    hora_fin: string,
    estado: number,
    cantidad_minima: number,
    edad_minima: number, 
    cod_sector: number,
    reclusos: Array<Recluso>,

}

