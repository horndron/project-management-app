import { AfterViewInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  fromEvent, map, throttleTime,
} from 'rxjs';
import { HEADERSCROLLFORSTICKY, HEADERTHROTTLETIME } from './header.constant';

@Component({
  selector: 'rsm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {
  isAuth = false;

  isSticky = false;

  constructor(
    private readonly store: Store,
  ) { }

  ngAfterViewInit() {
    this.onStickyHeader();
  }

  onStickyHeader() {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(HEADERTHROTTLETIME),
      map(() => window.pageYOffset),
    );

    scroll$.subscribe((offset) => {
      if (offset > HEADERSCROLLFORSTICKY && !this.isSticky) {
        this.isSticky = true;
      } else if ((offset < HEADERSCROLLFORSTICKY && this.isSticky)) {
        this.isSticky = false;
      }
    });
  }
}
