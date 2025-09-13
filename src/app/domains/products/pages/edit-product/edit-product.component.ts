import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Category } from '@app/shared/models/Category';
import { Product } from '@app/shared/models/Product.model';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '@app/domains/category/services/category.service';
import { FilterService } from '../../services/filter.service';
import { PaginationService } from '@app/shared/services/pagination.service';
import { SearchComponent } from '../../components/search/search.component';
import { ActiveFiltersComponent } from '../../components/active-filters/active-filters.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { LoaderComponent } from '@app/components/ui/loader/loader.component';
import { FilterCategoryComponent } from '../../components/filter-category/filter-category.component';
import { FilterPriceComponent } from '../../components/filter-price/filter-price.component';
import { ItemProductEditComponent } from '../../components/item-product-edit/item-product-edit.component';
import { ProductDeletionPayload } from '../../models/ProducPayload';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  imports: [
    SearchComponent,
    ActiveFiltersComponent,
    PaginationComponent,
    LoaderComponent,
    FilterCategoryComponent,
    FilterPriceComponent,
    ItemProductEditComponent,
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export default class EditProductComponent implements OnInit, OnChanges {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  loading = signal<boolean>(false);
  private productsServices = inject(ProductService);
  private categoryService = inject(CategoryService);
  private filtersService = inject(FilterService);
  private paginationService = inject(PaginationService);
  @Input() categoryId?: string;
  @Input() title?: string;
  @Input() price_min?: number;
  @Input() price_max?: number;
  @Input({ required: true, transform: (value: string) => parseInt(value) || 1 })
  page!: number;

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.syncFilters();
    this.syncPagination();
    this.getProducts();
  }

  private getProducts() {
    this.loading.set(true);
    const filter = this.filtersService.filters;
    console.log('Filtros', filter);

    this.productsServices
      .getProductsByFilters({
        ...filter,
        ...this.paginationService.pagination(),
      })
      .subscribe({
        next: (products) => {
          this.loading.set(false);
          this.products.set(products);
        },
      });
  }

  get Filters() {
    return {
      categoryId: this.categoryId,
      title: this.title,
      price_min: this.price_min,
      price_max: this.price_max,
    };
  }

  private getCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  private syncFilters() {
    const filters = this.Filters;
    this.filtersService.syncFilters(filters);
  }

  private syncPagination() {
    this.paginationService.syncPagination({
      limit: this.paginationService.limit(),
      offset: (this.page - 1) * this.paginationService.limit(),
    });
  }

  deleteProduct(payload: ProductDeletionPayload) {
    const { product } = payload;

    const el = document.querySelector(`#product-item-${product.id}`);
    el?.classList.add('load-pulse');

    this.productsServices
      .delete(product.id.toString())
      .pipe(
        finalize(() => {
          console.log('from finalize');
          el?.classList.remove('load-pulse');
        })
      )
      .subscribe({
        next: (status: boolean) => {
          if (status === true) {
            this.removeProduct(product);
          }
        },
      });
  }

  private removeProduct(productRemove: Product): void {
    this.products.update((products) =>
      products.filter((product) => product.id !== productRemove.id)
    );
  }
}
