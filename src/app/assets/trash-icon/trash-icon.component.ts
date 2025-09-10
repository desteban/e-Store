import { Component, Input } from '@angular/core';

@Component({
  selector: 'assets-trash-icon',
  imports: [],
  templateUrl: './trash-icon.component.html',
  styleUrl: './trash-icon.component.css',
})
export class TrashIconComponent {
  @Input({ required: false }) size: string = '32';
  @Input({ required: false }) className!: string;
  @Input({ required: false }) 'stroke-width': string = '2';
}
