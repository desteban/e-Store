import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordValidators } from '@app/utils/Validators/PasswordValidators.directives';

@Component({
  selector: 'app-validations',
  imports: [ReactiveFormsModule],
  templateUrl: './validations.component.html',
  styleUrl: './validations.component.css',
})
export class ValidationsComponent {
  private fb = inject(FormBuilder);
  private minLengthPassword = 8;

  registre = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(this.minLengthPassword),
            PasswordValidators.ValidPassword,
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: [PasswordValidators.matchPassword] }
    ),
  });

  get email() {
    return this.registre.get('email');
  }

  get passwordGroup() {
    return this.registre.get('password');
  }

  get password() {
    return this.registre.get('password.password');
  }

  get confirmPassword() {
    return this.registre.get('password.confirmPassword');
  }

  submit() {
    this.registre.markAllAsTouched();
    if (this.registre.invalid) {
      console.error('Fail');
      return;
    }

    console.log(this.registre.value);
  }
}
