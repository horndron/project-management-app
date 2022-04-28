import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export default class AppEffects {
  constructor(private actions$: Actions) {}
}
