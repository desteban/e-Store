import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-forms-control',
  imports: [FormsModule, ReactiveFormsModule],
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
    agree: new FormControl(false),
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
    if (this.newsLetterForm.invalid) {
      console.error('Tenemos errores');
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
