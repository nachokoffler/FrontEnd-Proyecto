export interface Administrador{
    dni:number;
    nombre:string;
    apellido:string;
    email:string;
    contrasenia: string | null; 
    administradores: Administrador[]; 
}

