import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { SearchSvgComponent } from '@app/assets/search-svg/search-svg.component';

@Component({
  selector: 'app-not-found',
  imports: [SearchSvgComponent, RouterLinkWithHref],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export default class NotFoundComponent {
  constructor(private title: Title) {
    this.title.setTitle('Not found');
  }
}
