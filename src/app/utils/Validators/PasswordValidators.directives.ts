import { AbstractControl } from '@angular/forms';

export class PasswordValidators {
  static ValidPassword(control: AbstractControl) {
    const value: string = control.value;

    if (!containNumber(value)) {
      return { invalid_password: true };
    }

    // null indica que todo está bien
    return null;
  }

  static matchPassword(control: AbstractControl) {
    const password: string = control.get('password')?.value;
    const confirmPassword: String = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { not_match: true };
    }

    return null;
  }
}

/**
 * Determina si una cadena de texto contiene al menos un número
 * @param {string} value
 * @returns {boolean}
 */
function containNumber(value: string): boolean {
  return value.split('').some((v) => isNumber(v));
}

/**
 * Character is a number?
 * @param {string} value Carácter para identificar si es un número
 * @returns {boolean}
 */
function isNumber(value: string): boolean {
  const base = 10;
  return !isNaN(parseInt(value, base));
}
