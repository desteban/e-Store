import { Component, OnInit } from '@angular/core';
import {
  FormControl,
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

  submit() {
    this.nameField.value?.trim();
    if (this.nameField.invalid) {
      console.error('Fail', this.nameField.errors);
      this.nameFieldsErrors = 'Invalid input';
      return;
    }

    console.log('Form is valid');
  }

  ngOnInit(): void {
    this.nameField.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
}
