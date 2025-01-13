import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    //withComponentInputBinding para leer parametros de la url
    provideRouter(routes, withComponentInputBinding()),
    // realizar llamadas http
    provideHttpClient(),
  ],
};
