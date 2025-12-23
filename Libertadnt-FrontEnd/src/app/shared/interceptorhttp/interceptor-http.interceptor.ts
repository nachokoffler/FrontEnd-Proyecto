import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');

  if(token) {
    const requestWithAuthorization = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(requestWithAuthorization);
  }

  return next(req);
};


