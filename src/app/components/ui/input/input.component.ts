import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';
import { InputType } from '@app/utils/InputTypes';

@Component({
  selector: 'components-ui-input',
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    /**
     * NG_VALUE_ACCESSOR: Permite conectarnos al Api ed control value accessor
     * forwardRef: lo Obtenemos desde angular Core y se le pasa un callback que retorna nuestro componente
     * multi: para aceptar multiples valores
     */
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) placeHolder!: string;
  @Input({ required: false }) id!: string;
  @Input({ required: false }) name!: string;
  @Input({ required: false }) error!: string | null | undefined;
  @Input({ required: false }) type: InputType = 'text';
  @Input({ required: false }) showError: boolean = false;

  currentValue: number | string = '';
  isDisabled: boolean = false;

  onChange = (_: any) => {};
  onTouch = (_: any) => {};

  /**
   *
   * @param obj Valor para actualizar el valor por defecto
   * @returns
   */
  writeValue(obj: number | string | null | undefined): void {
    if (obj === null || obj === undefined) {
      return;
    }

    this.currentValue = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleInput(event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.onChange(value);
  }

  onBlur() {
    this.onTouch(true);
  }
}
