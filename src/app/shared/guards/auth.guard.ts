import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/Auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const isAuthenticated: boolean = authService.isUserLoggedIn();
  if (!isAuthenticated) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
