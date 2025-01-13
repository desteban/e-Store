import { Routes } from '@angular/router';

import { ListComponent } from '@domains/products/pages/list/list.component';
import { NotFoundComponent } from './domains/error/not-found/not-found.component';
import { WithHeaderComponent } from './layouts/with-header/with-header.component';

export const routes: Routes = [
  {
    path: '',
    component: WithHeaderComponent,
    children: [
      { path: 'products', component: ListComponent },
      { path: '', component: ListComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
