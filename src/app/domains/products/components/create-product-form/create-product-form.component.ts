import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputComponent } from '@app/components/ui/input/input.component';
import { ErrorCreateProduct } from '../../models/ErrorsForms';
import { TrashIconComponent } from '@app/assets/trash-icon/trash-icon.component';
import { ViewHiddenComponent } from "@app/components/ui/view-hidden/view-hidden.component";

@Component({
  selector: 'products-components-create-product-form',
  imports: [InputComponent, ReactiveFormsModule, TrashIconComponent, ViewHiddenComponent],
  templateUrl: './create-product-form.component.html',
  styleUrl: './create-product-form.component.css',
})
export class CreateProductFormComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) images!: FormArray;
  @Input({ required: true }) errorsForm!: ErrorCreateProduct;

  @Output() addImage = new EventEmitter<void>();
  @Output() removeImage = new EventEmitter<number>();
  @Output() submitEvent = new EventEmitter<void>();

  get ImagesControls() {
    return this.images.controls;
  }

  get name() {
    return this.form.get('name');
  }

  addImageInput(): void {
    this.addImage.emit();
  }

  removeImageIn(index: number): void {
    this.removeImage.emit(index);
  }

  submitForm(): void {
    this.submitEvent.emit();
  }

  matchError(controlName: string): string | null {
    const control = this.form.get(controlName);
    if (!control) {
      return null;
    }

    return this.matchErrorControl(control, controlName);
  }

  matchErrorControl(
    control: AbstractControl<any, any>,
    controlName: string = ''
  ): string | null {
    if (!control.errors || !control.touched) {
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
}
