import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/verificar_token';

  constructor(private http: HttpClient, private router: Router) {}

  async verifyToken(token: string): Promise<boolean> {
    try {
      // No hace falta agregar headers si ya tenés interceptor
      await lastValueFrom(this.http.get(this.apiUrl));
      console.log("here1")
      return true; // Token válido PASA POR ACA PERO AUN ASI FALLA
    } catch (error: any) {
      console.log("here2")
      if (error.status == 401) {
        this.router.navigate(['/noAutorizado']);
      } else if (error.status == 403) {
        this.router.navigate(['/expirado']);
      }
      
      return false;
    }
  }
}

