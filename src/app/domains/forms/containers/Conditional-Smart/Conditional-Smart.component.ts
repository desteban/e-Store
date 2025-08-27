import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConditionalComponent } from '../../components/conditional/conditional.component';

interface ContactForm {
  fullName: {
    name: string;
    surname?: string;
  };
  type: 'company' | 'costumer';
  company?: string;
}

@Component({
  selector: 'app-conditional-smart',
  imports: [ConditionalComponent],
  templateUrl: './Conditional-Smart.component.html',
  styleUrl: './Conditional-Smart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConditionalSmartComponent {
  sendEmail(form: ContactForm) {
    setTimeout(() => {
      alert(
        'Hemos recibido tu información, nos pondremos en contacto lo más pronto posible'
      );
    }, 1000);
  }
}
