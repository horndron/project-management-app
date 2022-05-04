import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'rsm-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, AfterViewInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.translateService.use(environment.defaultLocale);
  }

  ngAfterViewInit() {
    this.addAnimation();
  }

  addAnimation() {
    function onEntry(entry: IntersectionObserverEntry[]) {
      entry.forEach((change) => {
        if (change.isIntersecting) {
          change.target.classList.add('element-show');
        }
      });
    }
    const options = { threshold: [0.5] };
    const observer: IntersectionObserver = new IntersectionObserver(onEntry, options);
    const elements = document.querySelectorAll('.element-animation');
    elements.forEach((elm) => observer.observe(elm));
  }
}
