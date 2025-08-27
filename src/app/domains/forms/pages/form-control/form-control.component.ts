import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormBuilderComponent } from '../../components/form-builder/form-builder.component';
import { ValidationsComponent } from '../../components/validations/validations.component';
import { ConditionalSmartComponent } from '../../containers/Conditional-Smart/Conditional-Smart.component';

@Component({
  selector: 'app-forms-control',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormBuilderComponent,
    ValidationsComponent,
    ConditionalSmartComponent,
  ],
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.css',
})
export default class FormControlComponent implements OnInit {
  nameFieldsErrors = '';
  nameField = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  categoryField = new FormControl('');
  agreeField = new FormControl(false);
  isAliveField = new FormControl('');

  newsLetterForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    agree: new FormControl(false, Validators.requiredTrue),
  });

  submit() {
    this.nameField.value?.trim();
    if (this.nameField.invalid) {
      console.error('Fail', this.nameField.errors);
      this.nameFieldsErrors = 'Invalid input';
      return;
    }

    console.log('Form is valid');
  }

  get nameNewsLetter() {
    return this.newsLetterForm.get('name');
  }

  get emailNewsLetter() {
    return this.newsLetterForm.get('email');
  }

  get agreeNewsLetter() {
    return this.newsLetterForm.get('agree');
  }

  submitNewsLetter() {
    this.newsLetterForm.markAllAsTouched();
    if (this.newsLetterForm.invalid) {
      return;
    }

    console.log('data', this.newsLetterForm.value);
  }

  ngOnInit(): void {
    this.nameField.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
}
