import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '@app/shared/models/Product.model';
import { CartService } from '@app/shared/services/cart.service';
import { ProductService } from '@app/domains/products/services/product.service';
import { CategoryService } from '@app/domains/category/services/category.service';
import { Category } from '@app/shared/models/Category';
import { SearchComponent } from '../../components/search/search.component';
import { FilterCategoryComponent } from '../../components/filter-category/filter-category.component';
import { FilterPriceComponent } from '../../components/filter-price/filter-price.component';
import { FilterService } from '../../services/filter.service';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ActiveFiltersComponent } from '../../components/active-filters/active-filters.component';
import { PaginationService } from '@app/shared/services/pagination.service';
import { LoaderComponent } from "@app/components/ui/loader/loader.component";

@Component({
  selector: 'app-list',
  imports: [
    ProductComponent,
    SearchComponent,
    FilterCategoryComponent,
    FilterPriceComponent,
    PaginationComponent,
    ActiveFiltersComponent,
    LoaderComponent
],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export default class ListComponent {
  cartService = inject(CartService);
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

  addProduct(product: Product) {
    this.cartService.addToCart(product);
  }

  private getProducts() {
    this.loading.set(true);
    this.productsServices
      .getProductsByFilters({
        ...this.filtersService.filters(),
        ...this.paginationService.pagination(),
      })
      .subscribe({
        next: (products) => {
          this.loading.set(false);
          this.products.set(products);
        },
      });
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
    this.filtersService.syncFilters({
      categoryId: this.categoryId,
      title: this.title,
      price_min: this.price_min,
      price_max: this.price_max,
    });
  }

  private syncPagination() {
    this.paginationService.syncPagination({
      limit: this.paginationService.limit(),
      offset: (this.page - 1) * this.paginationService.limit(),
    });
  }
}
