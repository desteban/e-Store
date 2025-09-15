import {
  HttpContext,
  HttpContextToken,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export const checkTimeContext = new HttpContextToken<boolean>(() => false);
export function CheckTime() {
  return new HttpContext().set(checkTimeContext, true);
}

export function TimeRequestInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  if (req.context.get(checkTimeContext)) {
    const start: number = performance.now();
    return next(req).pipe(
      tap((event) => {
        const end: number = performance.now() - start;
        console.log(req.url, `Duration: ${end} ms`);
      })
    );
  }

  return next(req);
}
