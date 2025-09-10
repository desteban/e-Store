import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputComponent } from '@app/components/ui/input/input.component';
import { ErrorCreateProduct } from '../../models/ErrorsForms';

type ErrorMessageFn = (control: AbstractControl) => string;

@Component({
  selector: 'products-components-create-product-form',
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './create-product-form.component.html',
  styleUrl: './create-product-form.component.css',
})
export class CreateProductFormComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) images!: FormArray;
  @Input({ required: true }) errorsForm!: ErrorCreateProduct;

  @Output() submitEvent = new EventEmitter<void>();

  get name() {
    return this.form.get('name');
  }

  submitForm(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      console.error('error', this.form.value);
      return;
    }

    this.submitEvent.emit();
  }

  matchError(controlName: string): string | null {
    const control = this.form.get(controlName);
    if (!control) {
      return null;
    }

    return this.matchErrorControl(control);
  }

  errorMessages: { [key: string]: ErrorMessageFn } = {
    required: (control) => 'This field is required.',
    minlength: (control) =>
      `The minimum length is ${
        control.getError('minlength').requiredLength
      } characters.`,
    min: (control) => `The minimum value is ${control.getError('min').min}.`,
    isNumber: () => 'The field is not a number.',
  };

  matchErrorControl(control: AbstractControl<any, any>): string | null {
    if (!control.errors || !control.touched) {
      return null;
    }

    const errorKey = Object.keys(control.errors)[0];
    if (errorKey && this.errorMessages[errorKey]) {
      return this.errorMessages[errorKey](control);
    }

    return null;
  }
}
