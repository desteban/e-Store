import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputComponent } from '@app/components/ui/input/input.component';
import { ErrorCreateProduct } from '../../models/ErrorsForms';

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

  get ImagesControls() {
    return this.images.controls;
  }

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
