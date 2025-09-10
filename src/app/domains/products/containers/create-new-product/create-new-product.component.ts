import { Component, inject } from '@angular/core';
import { CreateProductDTO } from '../../models/ProductsDTO';
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
  ],
  templateUrl: './create-new-product.component.html',
  styleUrl: './create-new-product.component.css',
})
export class CreateNewProductComponent {
  steps: Step[] = [{ title: 'Product' }, { title: 'Photo' }];
  totalSteps: number = this.steps.length;
  currentStep: number = 0;
  private validatorsImages: ((
    control: AbstractControl
  ) => ValidationErrors | null)[] = [Validators.required];

  productsService = inject(ProductService);
  formBuilder = inject(NonNullableFormBuilder);
  errors: ErrorCreateProduct = ErrorsDefault;
  errorsImages: ErrorImagesCreateProduct = ErrorsDefaultImages;
  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(1)]],
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

  createNewProduct() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const dataForm = this.form.getRawValue();
    const images: string[] = this.images.value;
    const productDTO: CreateProductDTO = {
      ...dataForm,
      images,
      title: dataForm.name,
      category: { id: 0, image: '', name: '' },
      price: +dataForm.price,
    };

    console.log('Product', productDTO);
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

  submitProduct() {
    this.currentStep = 1;
  }

  submitProductImages() {
    console.log('data', this.formImages.value);

    this.images.markAllAsTouched();
    this.form.markAllAsTouched();
    if (this.images.invalid && this.form.invalid) {
      return;
    }

    console.log('Validado');
  }
}
