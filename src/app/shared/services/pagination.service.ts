import { Injectable, signal } from '@angular/core';
import { Pagination } from '../models/Pagination';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  limit = signal<number>(20);
  offset = signal<number>(0);

  syncPagination(pagination: Pagination) {
    this.limit.set(pagination.limit);
    this.offset.set(pagination.offset);
  }

  pagination(): Pagination {
    return {
      limit: this.limit(),
      offset: this.offset(),
    };
  }
}
