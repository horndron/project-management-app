import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [ButtonModule, NotFoundRoutingModule, TranslateModule],
})
export class NotFoundModule { }
