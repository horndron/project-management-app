import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TranslateModule } from '@ngx-translate/core';
import { MainPageRoutingModule } from './main-page-routing.module';
import { CardWithIconComponent } from './components/card-with-icon/card-with-icon.component';
import { VideoBlockComponent } from './components/video-block/video-block.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { PreviewOnDifferentSizesComponent } from './components/preview-on-different-sizes/preview-on-different-sizes.component';

@NgModule({
  declarations: [
    CardWithIconComponent,
    VideoBlockComponent,
    MainPageComponent,
    PreviewOnDifferentSizesComponent,
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    ButtonModule,
    RippleModule,
    TranslateModule,
  ],
})
export class MainPageModule { }
