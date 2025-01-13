import { Routes } from '@angular/router';

import { ListComponent } from '@domains/products/pages/list/list.component';
import { NotFoundComponent } from './domains/error/not-found/not-found.component';
import { WithHeaderComponent } from './layouts/with-header/with-header.component';
import { AboutComponent } from './domains/about/about.component';
import { DetailComponent } from './domains/products/pages/detail/detail.component';

export const routes: Routes = [
  {
    path: '',
    component: WithHeaderComponent,
    children: [
      { path: '', component: ListComponent, title: 'Store' },
      { path: 'products', component: ListComponent, title: 'Store' },
      { path: 'about', component: AboutComponent, title: 'About' },
      { path: 'product/:id', component: DetailComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
