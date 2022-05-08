import { AfterViewInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  distinctUntilChanged,
  fromEvent, map, Observable, throttleTime,
} from 'rxjs';
import { HEADER_SCROLL_FOR_STICKY, HEADER_THROTTLE_TIME } from './header.constants';

@Component({
  selector: 'rsm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {
  isAuth = false;

  isSticky$!: Observable<boolean>;

  constructor(
    private readonly store: Store,
  ) { }

  ngAfterViewInit() {
    this.isSticky$ = fromEvent(window, 'scroll').pipe(
      throttleTime(HEADER_THROTTLE_TIME),
      map(() => window.pageYOffset > HEADER_SCROLL_FOR_STICKY),
      distinctUntilChanged(),
    );
  }
}
