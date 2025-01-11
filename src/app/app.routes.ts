import { Routes } from '@angular/router';

import { ListComponent } from '@domains/products/pages/list/list.component';

export const routes: Routes = [{ path: 'products', component: ListComponent },{ path: '', component: ListComponent }];
