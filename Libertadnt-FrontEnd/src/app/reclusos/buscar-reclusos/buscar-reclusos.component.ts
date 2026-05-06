import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReclusosService } from '../reclusos.service.js';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

// Validador personalizado a nivel del grupo
function alMenosUnCampo(control: AbstractControl): ValidationErrors | null {
  const nombre = control.get('nombre')?.value;
  const apellido = control.get('apellido')?.value;

  if (!nombre && !apellido) {
    return { alMenosUno: true }; 
  }
  return null; 
}

@Component({
  selector: 'app-buscar-reclusos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './buscar-reclusos.component.html',
  styleUrl: './buscar-reclusos.component.css'
})
export class BuscarReclusosComponent {

  recluso: FormGroup;
  nombre: FormControl;
  apellido: FormControl;
  cod_recluso: FormControl;
  dni: FormControl;
  bandera: boolean | undefined;

  constructor(public service: ReclusosService, private cdr: ChangeDetectorRef) {
    this.cod_recluso = new FormControl('');
    this.nombre = new FormControl('');
    this.apellido = new FormControl('');
    this.dni = new FormControl('');

    this.recluso = new FormGroup({
      nombre: this.nombre,
      cod_recluso: this.cod_recluso,
      apellido: this.apellido,
      dni: this.dni
    }, { validators: alMenosUnCampo });
  }

  getFecha(fecha_nac: string): string {
    const fecha = new Date(fecha_nac);
    return `${fecha.getDate()} / ${fecha.getMonth() + 1} / ${fecha.getFullYear()}`;
  }


  validarRecluso() {
    
    this.service.getBusquedaParcial(this.nombre.value, this.apellido.value).subscribe({
      next: (data) => {
        if (data.status == 201) {
          this.service.reclusos = { data: data.data || [] };
          console.log("reclusos encontrados", this.service.reclusos);
          this.bandera = true;
          this.cdr.detectChanges(); // 👈 fuerza la actualización de la vista
        }
      },
      error: (e) => {
        if (e.status === 404) {
          console.log("recluso no existente", e);
          this.bandera = false;
        }
      }
    });

    this.recluso.reset();
  }
sentenciasModal: any[] = [];
reclusoSeleccionadoModal: any = null;

abrirModalSentencias(item: any) {
  this.reclusoSeleccionadoModal = item;
  this.sentenciasModal = []; // limpia antes de cargar

  if (item.condenas && item.condenas.length > 0) {
    item.condenas.forEach((condena: any) => {
      if (condena.fecha_fin_real === null) {
        if (condena.sentencias && condena.sentencias.length > 0) {
          condena.sentencias.forEach((sentencia: any) => {
            this.sentenciasModal.push(sentencia);
          });
        }
      }
    });
  }

  console.log('total sentencias:', this.sentenciasModal.length);
  console.log('sentencias:', this.sentenciasModal);

  // destruye instancia vieja y crea una nueva
  setTimeout(() => {
    const modalEl = document.getElementById('modalSentenciasGlobal');
    let modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) {
      modalInstance.dispose(); // 👈 destruye instancia anterior
    }
    modalInstance = new (window as any).bootstrap.Modal(modalEl);
    modalInstance.show();
  }, 0);
}

getCondenasActivas(condenas: any[]): any[] {
  return condenas
    .filter((condena: any) => condena.fecha_fin_real === null)
    .flatMap((condena: any) => condena.sentencias);
}

}

function elif(arg0: boolean) {
  throw new Error('Function not implemented.');
}
