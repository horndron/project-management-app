import { AfterViewInit, Component } from '@angular/core';
import { ANIMATION_SHOW_CLASS, ELEMENT_ANIMATION_CLASS, VODEO_ID } from './main-page.constants';

@Component({
  selector: 'rsm-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements AfterViewInit {
  videoId = VODEO_ID;

  elementAnimation = ELEMENT_ANIMATION_CLASS;

  ngAfterViewInit() {
    this.addAnimation();
  }

  addAnimation() {
    const onEntry = (entry: IntersectionObserverEntry[]) => {
      entry.forEach((change) => {
        if (change.isIntersecting) {
          change.target.classList.add(ANIMATION_SHOW_CLASS);
        }
      });
    };
    const options = { threshold: [0.5] };
    const observer: IntersectionObserver = new IntersectionObserver(onEntry, options);
    const elements = document.querySelectorAll(this.elementAnimation);
    elements.forEach((elm) => observer.observe(elm));
  }
}
