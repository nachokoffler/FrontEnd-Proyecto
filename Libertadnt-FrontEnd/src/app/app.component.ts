import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgClass } from '@angular/common';
declare var bootstrap: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnChanges, OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  title = 'Libertadnt-FrontEnd';
  bandera: undefined | boolean;
  banana: undefined | boolean;
  rutaActual: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    let usuario = sessionStorage.getItem("usuario");
    if (usuario == 'maestro') { this.bandera = true; }
    if (usuario == 'menu') { this.bandera = false; }
    console.log("tipo de usuario: ", usuario);
  }

  ngOnInit(): void {
    let usuario = sessionStorage.getItem("usuario");
    if (usuario == 'maestro') { this.bandera = true; }
    if (usuario == 'menu') { this.bandera = false; }
    console.log("tipo de usuario: ", usuario);

    // Capturar ruta actual al iniciar
    this.rutaActual = this.router.url;

    // Escuchar cambios de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.rutaActual = (event as NavigationEnd).urlAfterRedirects;
    });
  }

  onActivate(componente: any) {
    let usuario = sessionStorage.getItem("usuario");
    if (usuario == 'maestro') { this.bandera = true; }
    if (usuario == 'menu') { this.bandera = false; }
    console.log('Componente activo:', componente);
    console.log('Nombre:', componente.constructor.name);
    if (componente.constructor.name == "_LogInComponent") {
      this.banana = true;
    } else {
      this.banana = false;
    }
  }

  cerrarSesion() {
    const offcanvasElement = document.getElementById('offcanvasBottom');
    if (offcanvasElement) {
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
      if (offcanvas) {
        offcanvas.hide();
      }
    }

    setTimeout(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, 300);
  }
}