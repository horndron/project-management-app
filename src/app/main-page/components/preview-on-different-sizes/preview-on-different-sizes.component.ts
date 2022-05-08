import { Component } from '@angular/core';
import {
  SCREENSHOT_ON_DIFFERENT_SCREEN_SIZES,
  DIFFERENT_SCREEN_SIZES,
  PATH_TO_SCREENSHOT_ON_DIFFERENT_SCREEN,
  PATH_TO_DIFFERENT_SCREEN,
} from '../../main-page.constants';

@Component({
  selector: 'rsm-preview-on-different-sizes',
  templateUrl: './preview-on-different-sizes.component.html',
  styleUrls: ['./preview-on-different-sizes.component.scss'],
})
export class PreviewOnDifferentSizesComponent {
  readonly nameImagesDifferentScreen = DIFFERENT_SCREEN_SIZES;

  readonly nameImagesPreviewScreenshot = SCREENSHOT_ON_DIFFERENT_SCREEN_SIZES;

  onFullPathDifferentScreen(index: number): string {
    return `${PATH_TO_DIFFERENT_SCREEN}/${this.nameImagesDifferentScreen[index]}`;
  }

  onFullPathPreviewImage(index: number): string {
    return `${PATH_TO_SCREENSHOT_ON_DIFFERENT_SCREEN}/${this.nameImagesPreviewScreenshot[index]}`;
  }
}
