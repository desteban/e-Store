import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  NonNullableFormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CreateProductFormComponent } from '../../components/create-product-form/create-product-form.component';
import {
  ErrorCreateProduct,
  ErrorImagesCreateProduct,
} from '../../models/ErrorsForms';
import { ProductService } from '../../services/product.service';
import { StepperComponent } from '@app/components/ui/stepper/stepper.component';
import { Step } from '@app/components/ui/stepper/Step';
import { ImagesProductComponent } from '../../components/images-product/images-product.component';
import { IsNumberValidator } from '@app/shared/validators/IsNumberValidator';
import { ListCategoriesComponent } from '../../components/list-categories/list-categories.component';
import { Category } from '@app/shared/models/Category';
import { CreateProductDTO } from '@app/shared/models/Product.model';

const ErrorsDefault: ErrorCreateProduct = {
  name: null,
  price: null,
  description: null,
};

const ErrorsDefaultImages: ErrorImagesCreateProduct = {
  images: [],
};

@Component({
  selector: 'product-create-new-product',
  imports: [
    CreateProductFormComponent,
    StepperComponent,
    ImagesProductComponent,
    ListCategoriesComponent,
  ],
  templateUrl: './create-new-product.component.html',
  styleUrl: './create-new-product.component.css',
})
export class CreateNewProductComponent {
  ProductService: ProductService = inject(ProductService);

  steps: Step[] = [
    { title: 'Product' },
    { title: 'Category' },
    { title: 'Photo' },
  ];
  totalSteps: number = this.steps.length;
  currentStep: number = 0;
  private validatorsImages: ((
    control: AbstractControl
  ) => ValidationErrors | null)[] = [Validators.required];

  category: Category = { id: -1, image: '', name: '' };
  productsService = inject(ProductService);
  formBuilder = inject(NonNullableFormBuilder);
  errors: ErrorCreateProduct = ErrorsDefault;
  errorsImages: ErrorImagesCreateProduct = ErrorsDefaultImages;
  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(1), IsNumberValidator()]],
    description: ['', [Validators.required, Validators.minLength(10)]],
  });
  formImages = this.formBuilder.array([
    this.formBuilder.control('', this.validatorsImages),
  ]);

  get name() {
    return this.form.get('name');
  }

  get images(): FormArray {
    return this.formImages as FormArray;
  }

  addImage(): void {
    this.images.push(this.formBuilder.control('', [Validators.required]));
  }

  removeImage(index: number): void {
    if (index <= 0) return;

    this.images.removeAt(index);
  }

  goToStep(step: number) {
    const permitChangeStep = this.isChangeStep(step);
    if (permitChangeStep) {
      return;
    }

    this.currentStep = step;
  }

  private isChangeStep(step: number): boolean {
    return step >= this.totalSteps || (step === 1 && this.form.invalid);
  }

  private nextStep(): void {
    this.currentStep = this.currentStep + 1;
  }

  selectCategory(category: Category) {
    this.category = category;
    this.nextStep();
  }

  submitProduct() {
    if (this.form.valid) {
      this.nextStep();
    }
  }

  submitProductImages() {
    this.images.markAllAsTouched();
    this.form.markAllAsTouched();
    if (this.images.invalid && this.form.invalid) {
      return;
    }

    this.createNewProduct();
  }

  private createNewProduct(): void {
    this.productsService.createProduct(this.productDTO).subscribe({
      complete() {
        alert('Producto agregado con éxito');
      },
      error(err) {},
    });
  }

  private get productDTO(): CreateProductDTO {
    const dataForm = this.form.getRawValue();
    const images: string[] = this.images.value;
    const productDTO: CreateProductDTO = {
      ...dataForm,
      images,
      title: dataForm.name,
      categoryId: this.category.id,
      price: +dataForm.price,
    };

    return productDTO;
  }
}
