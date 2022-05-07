import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import {
  distinctUntilChanged, fromEvent, map, throttleTime,
} from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'rsm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  auth: boolean = false;

  sticky: boolean = false;

  constructor(
    private readonly store: Store,
    private readonly translateService: TranslateService,
    private readonly primengConfig: PrimeNGConfig,
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.translateService.use(environment.defaultLocale);
  }

  ngAfterViewInit() {
    this.stickyHeader();
  }

  stickyHeader() {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
    );

    scroll$.subscribe(() => {
      if (window.pageYOffset > 5 && !this.sticky) {
        this.sticky = true;
        distinctUntilChanged();
      } else if ((window.pageYOffset < 5 && this.sticky)) {
        this.sticky = false;
        distinctUntilChanged();
      }
    });
  }
}
