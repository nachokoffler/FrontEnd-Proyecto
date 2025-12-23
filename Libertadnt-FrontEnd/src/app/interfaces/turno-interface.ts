import { Sector} from '../interfaces/sector-interface.js';
import { Guardia} from '../interfaces/guardia-interface.js';
export interface Turno {
  cod_guardia: Guardia,
  cod_sector: Sector,
  turno: string,
  turnos: Turno[] 
}
