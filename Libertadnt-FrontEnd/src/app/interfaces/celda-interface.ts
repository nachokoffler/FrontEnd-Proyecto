import { Recluso } from "./recluso-interface";

export interface Celda {
        cod_celda:number,
        cod_sector:number,
        descripcion : string,
        capacidad: number,
        reclusos: Recluso[],
        celdas: Celda[] 
}