import { Recluso } from "./recluso-interface";

export interface Ilegal {
      cod_act_ilegal : number,
      nombre: string,
      descripcion: string, 
      locacion: string, 
      dia_de_la_semana: number, 
      hora_inicio: number, 
      hora_fin: number,
      estado: number,
      cantidad_maxima: number,
      reclusos : Recluso[],
      ilegales: Ilegal[]
}
