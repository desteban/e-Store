import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export function TimeRequestInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const start: number = performance.now();
  return next(req).pipe(
    tap((event) => {
      const end: number = performance.now() - start;
      console.log(req.url, `Duration: ${end} ms`);
    })
  );
}
