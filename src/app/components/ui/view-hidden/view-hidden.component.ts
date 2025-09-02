import { Component, Input } from '@angular/core';

@Component({
  selector: 'components-view-hidden',
  imports: [],
  templateUrl: './view-hidden.component.html',
  styleUrl: './view-hidden.component.css',
})
export class ViewHiddenComponent {
  @Input({ required: true }) text!: string;
}
