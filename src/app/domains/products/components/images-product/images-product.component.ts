import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorImagesCreateProduct } from '../../models/ErrorsForms';
import { ViewHiddenComponent } from '@app/components/ui/view-hidden/view-hidden.component';
import { TrashIconComponent } from '@app/assets/trash-icon/trash-icon.component';
import { InputComponent } from '@app/components/ui/input/input.component';

@Component({
  selector: 'product-create-new-product-images',
  imports: [
    ReactiveFormsModule,
    ViewHiddenComponent,
    TrashIconComponent,
    InputComponent,
  ],
  templateUrl: './images-product.component.html',
  styleUrl: './images-product.component.css',
})
export class ImagesProductComponent {
  @Input({ required: true }) images!: FormArray;
  @Input({ required: true }) errorsForm!: ErrorImagesCreateProduct;

  @Output() addImage = new EventEmitter<void>();
  @Output() removeImage = new EventEmitter<number>();
  @Output() submitEvent = new EventEmitter<void>();

  get ImagesControls(): FormControl[] {
    return this.images.controls as FormControl[];
  }

  addImageInput(): void {
    this.addImage.emit();
  }

  removeImageIn(index: number): void {
    this.removeImage.emit(index);
  }

  matchErrorControl(
    control: FormControl,
    controlName: string = ''
  ): string | null {
    if (!control.touched) {
      return null;
    }

    if (control.hasError('required')) {
      return `The field "${controlName}" is required.`;
    }
    if (control.hasError('minlength')) {
      return `The minimum length for "${controlName}" is ${
        control.getError('minlength').requiredLength
      } characters.`;
    }
    if (control.hasError('min')) {
      return `The minimum value allowed for "${controlName}" is ${
        control.getError('min').min
      }.`;
    }

    return null;
  }

  submitForm(e: Event): void {
    e.preventDefault();
    this.images.markAllAsTouched();

    if (this.images.invalid) {
      return;
    }
    this.submitEvent.emit();
  }
}
