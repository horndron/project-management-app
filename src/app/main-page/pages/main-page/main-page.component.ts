import { AfterViewInit, Component } from '@angular/core';
import { VODEOID } from './main-page.constants';

@Component({
  selector: 'rsm-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements AfterViewInit {
  videoId = VODEOID;

  ngAfterViewInit() {
    this.addAnimation();
  }

  // eslint-disable-next-line class-methods-use-this
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
