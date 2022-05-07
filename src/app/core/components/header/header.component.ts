import { AfterViewInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  distinctUntilChanged,
  fromEvent, map, Observable, throttleTime,
} from 'rxjs';
import { HEADERSCROLLFORSTICKY, HEADERTHROTTLETIME } from './header.constants';

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
      throttleTime(HEADERTHROTTLETIME),
      map(() => window.pageYOffset > HEADERSCROLLFORSTICKY),
      distinctUntilChanged(),
    );
  }
}
