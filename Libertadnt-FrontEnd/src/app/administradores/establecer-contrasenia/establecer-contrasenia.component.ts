import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdministradorService } from '../administrador.service.js';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-establecer-contrasenia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './establecer-contrasenia.component.html'
})

export class EstablecerContraseniaComponent implements OnInit {
  token: string = ''
  isLoading: boolean = false
  success: boolean = false
  errorMsg: string = ''
  administrador: FormGroup 
  constrasenia1: FormControl
  constrasenia2: FormControl 
  banana: string = ''

  constructor(
    public service: AdministradorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
      this.constrasenia1 = new FormControl('',Validators.required)
      this.constrasenia2 = new FormControl('',Validators.required)
      this.administrador = new FormGroup({
        contrasenia1: this.constrasenia1,
        contrasenia2: this.constrasenia2 
      })
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParams['token'] ?? ''
    if (!this.token) this.errorMsg = 'El enlace es inválido o expiró.'
  }

  onSubmit() {

    if (this.constrasenia1.value != this.constrasenia2.value) {
      this.banana = 'contrasenia'
      this.errorMsg = 'Las contraseñas no coinciden.'
      return
    }
    let envio = {
      token: this.token,
      contrasenia: this.constrasenia1.value
    }
    console.log("json del post",envio)
    this.service.completarRegistro(envio).subscribe({
      next: (data) => {
        this.banana = 'exito'
        setTimeout(() => this.router.navigate(['/login']), 3000)
      },
      error: (e) => {
        this.banana = 'error'
        this.errorMsg = e.status === 410      ? 'El enlace expiró. Contactá a un administrador.'    : 'El enlace es inválido o ya fue utilizado.'  
       }     
      })
  }
}
