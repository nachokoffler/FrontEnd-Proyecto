import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError } from "rxjs";
import { throwError } from 'rxjs';

export const Interceptor_token_fallida: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.error('Unauthorized: Redirecting to login')
        router.navigate(['/noAutorizado'])
      } else if (error.status === 403) {
        if(error.message == 'token expirado'){
          router.navigate(['/expirado'])
        } 
      }
      return throwError(() => error);
    })
  )
}

