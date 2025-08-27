import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'forms-conditional',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './conditional.component.html',
  styleUrl: './conditional.component.css',
})
export class ConditionalComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    fullName: this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: [''],
    }),

    type: ['', [Validators.required]],
    company: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.typeField?.valueChanges.subscribe((value) =>
      this.typeCompanyListener(value)
    );
  }

  get typeField() {
    return this.form.get('type');
  }

  get company() {
    return this.form.get('company');
  }

  get fullName() {
    return this.form.get('fullName');
  }

  get nameField() {
    return this.form.get('fullName.name');
  }

  private typeCompanyListener(value: string | null) {
    if (value === 'company') {
      console.log('es una empresa');
      this.company?.setValidators([Validators.required]);
    }

    if (value !== 'company') {
      this.company?.setValidators(null);
    }

    this.company?.updateValueAndValidity();
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      console.error('fails');
      return;
    }

    alert('Formulario validado');
    console.log(this.form.value);
  }
}
