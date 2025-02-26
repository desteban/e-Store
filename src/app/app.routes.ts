import { Routes } from '@angular/router';

import { WithHeaderComponent } from './layouts/with-header/with-header.component';

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
        path: 'product/:id',
        loadComponent: () =>
          import('@domains/products/pages/detail/detail.component'),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('@domains/error/not-found/not-found.component'),
  },
];
