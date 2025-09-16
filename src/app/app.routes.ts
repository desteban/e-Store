import { Routes } from '@angular/router';

import { WithHeaderComponent } from './layouts/with-header/with-header.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: WithHeaderComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@domains/products/pages/list/list.component'),
        title: 'Store',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('@domains/products/pages/list/list.component'),
        title: 'Store',
      },
      {
        path: 'about',
        loadComponent: () => import('@domains/about/about.component'),
        title: 'About',
      },
      {
        path: 'product/new',
        loadComponent: () =>
          import('@domains/products/pages/add-product/add-product.component'),
        canActivate: [authGuard],
      },
      {
        path: 'products/edit',
        loadComponent: () =>
          import('@domains/products/pages/edit-product/edit-product.component'),
        canActivate: [authGuard],
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import('@domains/products/pages/detail/detail.component'),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('@domains/auth/pages/login/login.component'),
  },
  {
    path: '**',
    loadComponent: () => import('@domains/error/not-found/not-found.component'),
  },
];
