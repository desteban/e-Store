import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { AuthLogin } from '@app/shared/models/Auth';
import { AuthService } from '@app/shared/services/Auth.service';
import { InputComponent } from '@app/components/ui/input/input.component';
import { Router } from '@angular/router';

type ErrorMessageFn = (control: AbstractControl) => string;

@Component({
  selector: 'app-login',
  imports: [InputComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {
  errorForm: string | null = null;
  private router = inject(Router);
  private authService: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);
  loginForm: FormGroup = this.fb.group({
    user: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  get user() {
    return this.loginForm.get('user');
  }

  get password() {
    return this.loginForm.get('password');
  }

  MatchErrors(controlName: string): string | null {
    const control: AbstractControl | null = this.loginForm.get(controlName);
    if (!control) return null;

    return this.MatchErrorFormControl(control);
  }

  private errorMessages: { [key: string]: ErrorMessageFn } = {
    required: (control) => 'This field is required.',
    minlength: (control) =>
      `The minimum length is ${
        control.getError('minlength').requiredLength
      } characters.`,
    min: (control) => `The minimum value is ${control.getError('min').min}.`,
    email: (control: AbstractControl) => `Please enter a valid email address.`,
  };

  private MatchErrorFormControl(control: AbstractControl): string | null {
    if (!control.errors || !control.touched) return null;

    const errorKey = Object.keys(control.errors)[0];
    const error: string | null = this.errorMessages[errorKey](control);
    return error;
  }

  public Login(e: Event) {
    e.preventDefault();
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }

    this.errorForm = null;
    const dataLogin: AuthLogin = {
      email: this.user?.value,
      password: this.password?.value,
    };

    this.authService.login(dataLogin).subscribe({
      next: (data) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorForm = err;
      },
    });
  }
}
