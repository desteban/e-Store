import {
  HttpClient,
  HttpContext,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthLogin, RefreshingAccessToken, Tokens } from '../models/Auth';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { User } from '../models/User';
import { checkTimeContext } from '../interceptors/TimeRequestInterceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = 'https://api.escuelajs.co/api/v1/auth';
  private _accessToken: string | undefined = undefined;

  /**
   * Handles user authentication to log into the application.
   *
   * This method sends user credentials to the API to obtain access tokens,
   * which are required to access protected content and features.
   *
   * @param {AuthLogin} login - An object containing the user's login credentials (email and password).
   * @returns {Observable<Tokens>} An observable that emits a Tokens object containing the access and refresh tokens upon successful login.
   *
   * @example
   * ```typescript
   * import { AuthLogin, Tokens } from '@models/Auth';
   *
   * const dataLogin: AuthLogin = {
   * email: 'user@example.com',
   * password: 'secret_password_123',
   * };
   *
   * // Subscribe to the Observable to handle the response or any errors.
   * authService.login(dataLogin).subscribe({
   * next: (tokens: Tokens) => {
   * console.log('Login successful! Access token:', tokens.access_token);
   * localStorage.setItem('accessToken', tokens.access_token);
   * },
   * error: (err) => console.error('Login failed:', err)
   * });
   * ```
   */
  login(login: AuthLogin) {
    const url: string = `${this.baseUrl}/login`;
    return this.http.post<Tokens>(url, login).pipe(
      // Guardar los tokens
      tap((tokens) => {
        this.updateTokens(tokens);
      }),
      map((tokens) => true),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 0)
          return throwError(
            () => 'Connection lost. Please check your internet.'
          );

        if (err.status !== 401) return throwError(() => 'Unexpected error.');

        return throwError(() => 'Invalid username or password.');
      })
    );
  }

  private refreshAccessToken(): void {
    const url: string = `${this.baseUrl}/refresh-token`;
    const token: string | null = this.refreshToken;

    if (token === null) return;

    const content: RefreshingAccessToken = {
      refreshToken: token,
    };
    this.http.post<Tokens>(url, content).subscribe({
      next: (tokens) => this.updateTokens(tokens),
    });
  }

  /**
   * Actualizar tokens de sesión del usuario
   * @param {Tokens} tokens Tokens para reemplazar los existentes
   */
  private updateTokens(tokens: Tokens): void {
    const { access_token, refresh_token } = tokens;
    this.accessToken = access_token;
    this.refreshToken = refresh_token;
  }

  get accessToken(): string | undefined {
    const token: string | undefined = this._accessToken;
    if (token === undefined) {
      const currentToken: string | undefined =
        localStorage.getItem('_rfa') ?? undefined;
      this._accessToken = currentToken;
    }

    return this._accessToken;
  }

  private set accessToken(token: string | undefined) {
    this._accessToken = undefined;
    if (token === undefined) {
      localStorage.removeItem('_rfa');
      return;
    }

    localStorage.setItem('_rfa', token);
  }

  private get refreshToken(): string | null {
    let token: string | null = localStorage.getItem('_rf');
    return token;
  }

  private set refreshToken(token: string | undefined) {
    if (token === undefined) {
      localStorage.removeItem('_rf');
      return;
    }

    localStorage.setItem('_rf', token);
  }

  public isUserLoggedIn(): boolean {
    const tk = this.refreshToken;
    return tk !== null && tk.length !== 0;
  }

  public profile(): Observable<User> {
    const url: string = `${this.baseUrl}/profile`;
    const token: string | undefined = this.accessToken;
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const context: HttpContext = new HttpContext().set(checkTimeContext, true);

    return this.http.get<User>(url, { headers, context });
  }

  public logout() {
    this.accessToken = undefined;
  }
}
