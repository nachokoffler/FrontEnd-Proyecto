import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterOutlet ,RouterLink, Router} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],// ,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnChanges{

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  title = 'Libertadnt-FrontEnd'
  bandera: undefined | boolean
  banana: undefined | boolean
  rutaActual: string = '';
  ngOnChanges(changes: SimpleChanges): void {

    console.log("ruta actual: ",this.router.url);
    let usuario = sessionStorage.getItem("usuario");
    if( usuario == 'maestro'){this.bandera = true}
    if(usuario == 'menu'){this.bandera = false}


    if( usuario == null){this.banana = true}
    if( usuario !== null){this.banana = false}
    console.log("tipo de ususario: ",usuario)

    if(this.router.url == '/login'){
      console.log("tu mama")
    }
  
  }

  ngOnInit(): void {
    let usuario = sessionStorage.getItem("usuario");
    if( usuario == 'maestro'){this.bandera = true}
    if(usuario == 'menu'){this.bandera = false}
    if( usuario == null){this.banana = true}
    if( usuario !== null){this.banana = false}
    console.log("tipo de ususario: ",usuario)
    console.log("ruta actual: ",this.activatedRoute.snapshot.url);    
    this.rutaActual = this.router.url;
    console.log("ruta actual: ",this.router.url);
  

  }
  
  


   
}


