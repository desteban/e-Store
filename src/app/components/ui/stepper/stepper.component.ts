import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Step } from './Step';

@Component({
  selector: 'components-ui-stepper',
  imports: [],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
})
export class StepperComponent {
  @Input({ required: true }) steps!: Step[];
  @Input({ required: true }) currentStep: number = 0;
  @Input({ required: false }) enableChangeStep: boolean = false;
  @Output() nextStep = new EventEmitter();
  @Output() prevStep = new EventEmitter();
  @Output() goToStep = new EventEmitter<number>();

  disableStep(step: number): boolean {
    if (step <= this.currentStep) {
      return false;
    }

    return !this.enableChangeStep;
  }

  changeStep(step: number) {
    this.goToStep.emit(step);
  }

  ariaLabelButton(step: number): string {
    return `Cambiar al paso ${step + 1}`;
  }
}
