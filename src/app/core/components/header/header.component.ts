import { AfterViewInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  distinctUntilChanged, fromEvent, map, throttleTime,
} from 'rxjs';
import { HEADERSCROLLFORSTICKY } from './constant';

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
      throttleTime(10),
      map(() => window.pageYOffset),
    );

    scroll$.subscribe(() => {
      if (window.pageYOffset > HEADERSCROLLFORSTICKY && !this.isSticky) {
        this.isSticky = true;
      } else if ((window.pageYOffset < HEADERSCROLLFORSTICKY && this.isSticky)) {
        this.isSticky = false;
      }
    });
  }
}
