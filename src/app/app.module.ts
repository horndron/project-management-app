import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';
import { reducers, metaReducers } from './redux/reducers';
import { environment } from '../environments/environment';
import AppEffects from './redux/effects/app.effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export default class AppModule { }
