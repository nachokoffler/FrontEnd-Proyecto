import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `http://localhost:3000/verificar_token`;

  constructor(private http: HttpClient, private router: Router) {}

  async verifyToken(token: string): Promise<boolean> {
    try {
      console.log(1)
      await lastValueFrom(this.http.get(this.apiUrl));
      console.log(2)
      return true; // Token válido PASA POR ACA PERO AUN ASI FALLA
    } catch (error: any) {
      if (error.status == 401) {
        this.router.navigate(['/noAutorizado']);
      } else if (error.status == 403) {
        this.router.navigate(['/expirado']);
      }
      
      return false;
    }
  }

}

