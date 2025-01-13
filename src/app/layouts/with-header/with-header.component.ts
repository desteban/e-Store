import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@app/shared/header/header.component';

@Component({
  selector: 'app-with-header',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './with-header.component.html',
  styleUrl: './with-header.component.css',
})
export class WithHeaderComponent {}
