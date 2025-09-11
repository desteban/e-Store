import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Category } from '@app/shared/models/Category';
import { CategoriesService } from '@app/shared/services/categories.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'products-list-categories',
  imports: [ReactiveFormsModule],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.css',
})
export class ListCategoriesComponent implements OnInit {
  @Output() selectCategory = new EventEmitter<Category>();

  CategoryService = inject(CategoriesService);
  searchControl = new FormControl();
  categories: Category[] = [];
  selectedCategory: number | null = null;

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        // this.SearchCategories(value);
      });

    this.SearchCategories();
  }

  private SearchCategories(): void {
    const response = this.CategoryService.getCategories();
    response.subscribe({
      next: (categories) => {
        console.log(categories);
        this.categories = categories;
      },
      error(err) {
        alert('No pudimos obtener las categorías');
      },
    });
  }

  onSelectCategory(index: number) {
    const category: Category = this.categories[index];
    if (!category) {
      alert('You selected a category that is not available.');
      return;
    }

    this.selectedCategory = index;
    this.selectCategory.emit(category);
  }
}
