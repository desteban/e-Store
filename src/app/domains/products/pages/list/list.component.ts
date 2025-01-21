import { Component, inject, input, Input, signal, SimpleChanges } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '@app/shared/models/Product.model';
import { CartService } from '@app/shared/services/cart.service';
import { ProductService } from '@app/shared/services/product.service';
import { CategoryService } from '@app/domains/category/services/category.service';
import { Category } from '@app/shared/models/Category';
import { SearchComponent } from '../../components/search/search.component';
import { FilterCategoryComponent } from '../../components/filter-category/filter-category.component';
import { FilterPriceComponent } from '../../components/filter-price/filter-price.component';
import { FilterService } from '../../services/filter.service';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [
    ProductComponent,
    SearchComponent,
    FilterCategoryComponent,
    FilterPriceComponent,
    PaginationComponent,
    JsonPipe,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export default class ListComponent {
  cartService = inject(CartService);
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private productsServices = inject(ProductService);
  private categoryService = inject(CategoryService);
  private filtersService = inject(FilterService);
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
    this.getProducts();
  }

  addProduct(product: Product) {
    this.cartService.addToCart(product);
  }

  private getProducts() {
    this.productsServices
      .getProductsByFilters(this.filtersService.filters())
      .subscribe({
        next: (products) => {
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
      offset: (this.page - 1) * this.filtersService.limit(),
    });
  }
}
