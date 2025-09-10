import { Component, inject } from '@angular/core';
import { CreateProductDTO } from '../../models/ProductsDTO';
import {
  FormArray,
  FormBuilder,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { CreateProductFormComponent } from '../../components/create-product-form/create-product-form.component';
import { ErrorCreateProduct } from '../../models/ErrorsForms';
import { ProductService } from '../../services/product.service';

const ErrorsDefault: ErrorCreateProduct = {
  name: null,
  price: null,
  description: null,
  images: [],
};

@Component({
  selector: 'product-create-new-product',
  imports: [CreateProductFormComponent],
  templateUrl: './create-new-product.component.html',
  styleUrl: './create-new-product.component.css',
})
export class CreateNewProductComponent {
  productsService = inject(ProductService);
  formBuilder = inject(NonNullableFormBuilder);
  errors: ErrorCreateProduct = ErrorsDefault;
  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(1)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    images: this.formBuilder.array([
      this.formBuilder.control('', [Validators.required]),
    ]),
  });

  get name() {
    return this.form.get('name');
  }

  get images(): FormArray {
    return this.form.get('images') as FormArray;
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
      console.error('Formulario no valido', this.form.value);
      return;
    }

    const dataForm = this.form.getRawValue();
    const productDTO: CreateProductDTO = {
      ...dataForm,
      title: dataForm.name,
      category: { id: 0, image: '', name: '' },
      price: +dataForm.price,
    };
    // this.productsService.createProduct()

    console.log('Product', productDTO);
  }
}
