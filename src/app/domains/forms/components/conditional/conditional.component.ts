import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

interface ContactForm {
  fullName: {
    name: string;
    surname?: string;
  };
  type: 'company' | 'costumer';
  company?: string;
}

@Component({
  selector: 'forms-conditional',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './conditional.component.html',
  styleUrl: './conditional.component.css',
})
export class ConditionalComponent implements OnInit {
  @Output() sendContact = new EventEmitter<ContactForm>();

  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    fullName: this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: [''],
    }),
    email: ['', [Validators.required, Validators.email]],
    type: ['', [Validators.required]],
    company: [{ value: '', disabled: true }, [Validators.required]],
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

  get emailField() {
    return this.form.get('email');
  }

  private typeCompanyListener(value: string | null) {
    if (value === 'company') {
      console.log('es una empresa');
      this.company?.setValidators([Validators.required]);
      this.company?.enable();
    }

    if (value !== 'company') {
      this.company?.setValidators(null);
      this.company?.disable();
      this.company?.setValue('');
    }

    this.company?.updateValueAndValidity();
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      console.error('fails');
      return;
    }

    console.log(this.form.value);
    this.sendContact.emit(this.form.value as ContactForm);
  }
}
