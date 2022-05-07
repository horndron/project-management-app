import {
  AfterViewInit, Component, ElementRef, QueryList, ViewChildren,
} from '@angular/core';
import { ANIMATION_SHOW_CLASS, ELEMENT_ANIMATION, VODEO_ID } from './main-page.constants';

@Component({
  selector: 'rsm-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements AfterViewInit, OnDestroy {
  @ViewChildren(ELEMENT_ANIMATION, { read: ElementRef }) animationElements!: QueryList<ElementRef>;

  videoId = VODEO_ID;

  private observer: IntersectionObserver | undefined;

  ngAfterViewInit() {
    this.addAnimation();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
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
    this.observer = new IntersectionObserver(onEntry, options);
    this.animationElements.forEach((element) => {
      const isElement = element.nativeElement;
      if (this.observer) {
        this.observer.observe(isElement);
      }
    });
  }
}
