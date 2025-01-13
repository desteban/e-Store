import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  // templateUrl: './app.component.html',
  template: '<router-outlet />',
})
export class AppComponent {
  title = 'store';
}
