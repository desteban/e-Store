import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Either } from '@app/utils/Either';
import { Category } from '../models/Category';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiError } from '../models/ApiError';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://api.escuelajs.co/api/v1/categories';

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl);
  }

  private handleHttpError(error: HttpErrorResponse): ApiError {
    let message = 'Error desconocido';
    let details = null;

    switch (error.status) {
      case 0:
        message = 'Error de conexión. Verifica tu conexión a internet.';
        break;
      case 400:
        message = 'Solicitud inválida. Verifica los datos enviados.';
        details = error.error;
        break;
      case 401:
        message = 'No autorizado. Inicia sesión nuevamente.';
        break;
      case 403:
        message = 'No tienes permisos para realizar esta acción.';
        break;
      case 404:
        message = 'Recurso no encontrado.';
        break;
      case 422:
        message = 'Datos de validación incorrectos.';
        details = error.error;
        break;
      case 500:
        message = 'Error interno del servidor. Intenta más tarde.';
        break;
      default:
        message = error.error?.message || `Error HTTP ${error.status}`;
        details = error.error;
    }

    return {
      message,
      statusCode: error.status,
      timestamp: new Date(),
      details,
    };
  }
}
