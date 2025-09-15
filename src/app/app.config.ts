import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
} from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { TimeRequestInterceptor } from './shared/interceptors/TimeRequestInterceptor';
import { AuthInterceptor } from './shared/interceptors/Auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    //withComponentInputBinding para leer parametros de la url
    // withPreloading(PreloadAllModules) para prefetching de las rutas
    provideRouter(
      routes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules)
    ),
    // realizar llamadas http
    provideHttpClient(
      withInterceptors([
        TimeRequestInterceptor,
        AuthInterceptor,
      ])
    ),
  ],
};
