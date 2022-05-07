import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './app-store.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MissingTranslationService } from './core/ngx-translate/missing-translation.service';
import { HttpLoaderFactory } from './core/ngx-translate/http-loader-factory';
import { INTERCEPTOR_PROVIDERS } from './core/interceptors/providers';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AppStoreModule,
    HttpClientModule,
    environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 25 }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MissingTranslationService,
      },
      useDefaultLang: false,
    }),
  ],
  providers: [INTERCEPTOR_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule { }
