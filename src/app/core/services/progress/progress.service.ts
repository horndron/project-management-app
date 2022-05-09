import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  public dataLoading$: Observable<boolean>;

  private isLoading$ = new BehaviorSubject(false);

  constructor() {
    this.dataLoading$ = this.isLoading$.asObservable();
  }

  public show() {
    this.isLoading$.next(true);
  }

  public hide() {
    this.isLoading$.next(false);
  }
}
