import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component.js';
import { MenuComponent } from './menu/menu.component.js';
import { MenuSentenciaComponent } from './sentencia/menu-sentencia/menu-sentencia.component.js';
import { AltaSentenciaComponent } from './sentencia/alta-sentencia/alta-sentencia.component.js';
import { MenuGuardiaComponent } from './guardias/menu-guardia/menu-guardia.component.js';
import { AltaGuardiaComponent } from './guardias/alta-guardia/alta-guardia.component.js';
import { BuscarGuardiaComponent } from './guardias/buscar-guardia/buscar-guardia.component.js';
import { ModificarGuardiaComponent } from './guardias/modificar-guardia/modificar-guardia.component.js';
import { MostrarGuardiaComponent } from './guardias/mostrar-guardia/mostrar-guardia.component.js';
import { MenuReclusosComponent } from './reclusos/menu-reclusos/menu-reclusos.component.js';
import { AltaReclusosComponent } from './reclusos/alta-reclusos/alta-reclusos.component.js';
import { BuscarReclusosComponent } from './reclusos/buscar-reclusos/buscar-reclusos.component.js';
import { MoverReclusoComponent } from './reclusos/mover-recluso/mover-recluso.component.js';
import { ModificarCondenaComponent } from './reclusos/modificar-condena/modificar-condena.component.js';
import { MenuActividadComponent } from './actividades/menu-actividad/menu-actividad.component.js';
import { AltaActividadComponent } from './actividades/alta-actividad/alta-actividad.component.js';
import { ModificarActividadComponent } from './actividades/modificar-actividad/modificar-actividad.component.js';
import { MostrarActividadComponent } from './actividades/mostrar-actividad/mostrar-actividad.component.js';
import { MenuTallerComponent } from './talleres/menu-taller/menu-taller.component.js';
import { AltaTallerComponent } from './talleres/alta-taller/alta-taller.component.js';
import { InscripcionTallerComponent } from './talleres/inscripcion-taller/inscripcion-taller.component.js';
import { ModificarTallerComponent } from './talleres/modificar-taller/modificar-taller.component.js';
import { MostrarTallerComponent } from './talleres/mostrar-taller/mostrar-taller.component.js';
import { MenuSectorComponent } from './sector/menu-sector/menu-sector.component.js';
import { MenuTurnosComponent } from './sector/menu-turnos/menu-turnos.component.js';
import { MostrarCeldasComponent } from './sector/mostrar-celdas/mostrar-celdas.component.js';
import { MenuIlegalComponent } from './ilegal/menu-ilegal/menu-ilegal.component.js';
import { AltaIlegalComponent } from './ilegal/alta-ilegal/alta-ilegal.component.js';
import { ModificarIlegalComponent } from './ilegal/modificar-ilegal/modificar-ilegal.component.js';
import { IncribirseIlegalComponent } from './ilegal/incribirse-ilegal/incribirse-ilegal.component.js';
import { MostrarIlegalComponent } from './ilegal/mostrar-ilegal/mostrar-ilegal.component.js';
import { UsuariosComponent } from './log-in/administradores/usuarios.component.js';
import { LiberarReclusoComponent } from './reclusos/liberar-recluso/liberar-recluso.component.js';
import { FinalizarGuardiaComponent } from './guardias/finalizar-guardia/finalizar-guardia.component.js';
import { MostrarSenteniasComponent } from './sentencia/mostrar-sentencias/mostrar-sentenias.component.js';
import { CrearTurnosComponent } from './sector/crear-turnos/crear-turnos.component.js';
import { FinalizarTurnosComponent } from './sector/finalizar-turnos/finalizar-turnos.component.js'
import { AuthGuard } from './shared/authguards/auth.guard.js';
import { AuthGuardEspecial } from './shared/authguards/auth.guard_especial.js';
import { CrearSectorComponent } from './sector/crear-sector/crear-sector.component.js';
import { CrearAdministradorComponent } from './administradores/crear-administrador/crear-administrador.component.js';
import { EstablecerContraseniaComponent } from './administradores/establecer-contrasenia/establecer-contrasenia.component.js';

export const routes: Routes = [
    //completar registro con token en query param
    {path: 'completar-registro', component: EstablecerContraseniaComponent, canActivate: [AuthGuardEspecial]},
    //log in
    {path: ':usuario', component: LogInComponent},
    //menu
    {path: 'usuario/:menu', component: MenuComponent},
    {path: '',redirectTo: 'usuario', pathMatch:'full'},
    //usuario
    {path: 'usuario/:menu/ver-usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
    //sentencia
    {path: 'menu/sentencia', component: MenuSentenciaComponent, canActivate: [AuthGuard] },
    {path: 'menu/sentencia/alta', component: AltaSentenciaComponent, canActivate: [AuthGuard] },
    {path: 'menu/sentencia/sentencias', component: MostrarSenteniasComponent, canActivate: [AuthGuard] },

    //guardia
    {path: 'menu/guardia', component: MenuGuardiaComponent, canActivate: [AuthGuard] },
    {path: 'menu/guardia/alta-guardia', component:AltaGuardiaComponent, canActivate: [AuthGuard] },
    {path: 'menu/guardia/buscar-guardia', component:BuscarGuardiaComponent, canActivate: [AuthGuard] },
    {path: 'menu/guardia/modificar-guardia', component: ModificarGuardiaComponent, canActivate: [AuthGuard] },
    {path: 'menu/guardia/mostrar-guardia', component:MostrarGuardiaComponent, canActivate: [AuthGuard] },
    {path: 'menu/guardia/finalizar-guarida', component: FinalizarGuardiaComponent, canActivate: [AuthGuard] },
    //recluso
    {path: 'menu/recluso', component: MenuReclusosComponent, canActivate: [AuthGuard] },
    {path: 'menu/recluso/alta-recluso', component:AltaReclusosComponent, canActivate: [AuthGuard] },
    {path: 'menu/recluso/buscar-recluso', component: BuscarReclusosComponent, canActivate: [AuthGuard] },
    {path: 'menu/recluso/modificar-condena', component: ModificarCondenaComponent, canActivate: [AuthGuard] },
    {path: 'menu/recluso/Mover-Recluso', component: MoverReclusoComponent, canActivate: [AuthGuard] },
    {path: 'menu/recluso/liberar-recluso', component: LiberarReclusoComponent, canActivate: [AuthGuard] },
    //actividad
    {path: 'menu/actividad', component: MenuActividadComponent, canActivate: [AuthGuard] },
    {path: 'menu/actividad/alta-actividad', component: AltaActividadComponent, canActivate: [AuthGuard] },
    {path: 'menu/actividad/mostrar-actividad', component: MostrarActividadComponent, canActivate: [AuthGuard] },
    //{path: 'menu/actividad/mostrar-actividad', component: MostrarActividadComponent, canActivate: [AuthGuard] },
    //taller
    {path: 'menu/taller', component: MenuTallerComponent, canActivate: [AuthGuard] },
    {path: 'menu/taller/alta-taller', component: AltaTallerComponent, canActivate: [AuthGuard] },
    {path: 'menu/taller/inscripcion-taller', component:InscripcionTallerComponent, canActivate: [AuthGuard] },
    {path: 'menu/taller/modificar-taller', component: ModificarTallerComponent, canActivate: [AuthGuard] },
    {path: 'menu/taller/mostrar-taller', component: MostrarTallerComponent, canActivate: [AuthGuard] },
    //sector
    {path: 'usuario/menu/sector', component: MenuSectorComponent, canActivate: [AuthGuard] },
    {path: 'usuario/menu/sector/crear', component: CrearSectorComponent, canActivate: [AuthGuard] },
    
    {path: 'usuario/menu/sector/t/:sector', component: MenuTurnosComponent, canActivate: [AuthGuard] },
    {path: 'usuario/menu/sector/c/:sector', component: MostrarCeldasComponent, canActivate: [AuthGuard] },
    {path: 'usuario/menu/sector/t/:sector/crear-turnos', component: CrearTurnosComponent, canActivate: [AuthGuard] },
    {path: 'usuario/menu/sector/t/:sector/finalizar-turnos', component: FinalizarTurnosComponent, canActivate: [AuthGuard] },
    //ilegal
    {path: 'usuario/menu-maestro/menu', component: MenuIlegalComponent, canActivate: [AuthGuardEspecial] },
    {path: 'usuario/menu-maestro/menu/alta-actvidad', component: AltaIlegalComponent, canActivate: [AuthGuardEspecial] },
    {path: 'usuario/menu-maestro/menu/modificar-actividad', component: ModificarIlegalComponent, canActivate: [AuthGuardEspecial] },
    {path: 'usuario/menu-maestro/menu/inscripcion-actividad', component: IncribirseIlegalComponent, canActivate: [AuthGuardEspecial] },
    {path: 'usuario/menu-maestro/menu/mostrar-actividad', component: MostrarIlegalComponent, canActivate: [AuthGuardEspecial]},
    //Administradores
    {path: 'usuario/menu-maestro/administradores/crear', component:CrearAdministradorComponent , canActivate: [AuthGuardEspecial]},
]






