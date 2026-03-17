import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';

export const auth500Interceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 500) {
        sessionStorage.setItem("ultima ruta", router.url);
        console.error('Error de servidor');
        console.log('Dirección: ', router.url);
        router.navigate(['/noAutorizado']);
      }
      
      return throwError(() => error);
    })
  );
};
