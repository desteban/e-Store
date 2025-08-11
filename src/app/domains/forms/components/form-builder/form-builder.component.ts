import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  imports: [ReactiveFormsModule],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.css',
})
export class FormBuilderComponent {
  private formBuilder = inject(FormBuilder);
  contactForm = this.formBuilder.group({
    fullName: this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: [''],
    }),
    phone: ['', [Validators.required, Validators.pattern('^\\d+$')]],
  });

  get fullName() {
    return this.contactForm.get('fullName');
  }

  get nameForm() {
    return this.contactForm.get('fullName.name');
  }

  get surnameForm() {
    return this.contactForm.get('fullName.surname');
  }

  get phoneForm() {
    return this.contactForm.get('phone');
  }

  send() {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) {
      console.error('Errores de validación', this.phoneForm?.errors);
      return;
    }

    console.log(this.contactForm.value);
  }
}
