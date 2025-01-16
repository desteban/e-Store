import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '@app/shared/models/Product.model';
import { CartService } from '@app/shared/services/cart.service';
import { ProductService } from '@app/shared/services/product.service';
import { CategoryService } from '@app/domains/category/services/category.service';
import { Category } from '@app/shared/models/Category';
import { RouterLinkWithHref } from '@angular/router';
import { SearchComponent } from '../../components/search/search.component';
import { FilterCategoryComponent } from '../../components/filter-category/filter-category.component';

@Component({
  selector: 'app-list',
  imports: [ProductComponent, SearchComponent, FilterCategoryComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export default class ListComponent {
  cartService = inject(CartService);
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private productsServices = inject(ProductService);
  private categoryService = inject(CategoryService);
  @Input() categoryId?: string;
  @Input() title?: string;

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getProducts();
  }

  addProduct(product: Product) {
    this.cartService.addToCart(product);
  }

  private getProducts() {
    this.productsServices
      .getProductsByFilters({ categoryId: this.categoryId, title: this.title })
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
}
