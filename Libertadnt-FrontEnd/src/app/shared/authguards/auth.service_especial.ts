import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceEspecial {
  private apiUrl = 'http://localhost:3000/verificar_token/especial';

  constructor(private http: HttpClient, private router: Router) {}

  async verifyToken(token: string): Promise<boolean> {
    try {
      const response = await lastValueFrom(this.http.get(this.apiUrl));
      return true
    } catch (error: any) {
      if (error.status === 401) {
        this.router.navigate(['/noAutorizado']);
      } else if (error.status === 403) {
        this.router.navigate(['/expirado']);
      }
      return false
    }
  }
}
