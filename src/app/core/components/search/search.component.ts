import {
  ChangeDetectionStrategy, Component, OnInit, OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject, catchError, debounceTime, distinctUntilChanged, of, Subscription,
} from 'rxjs';
import { ROUTES } from 'src/app/constants/routes';

const DEBOUNCE_TIME = 500;

@Component({
  selector: 'rsm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  public search = '';
  public searchValue$ = new BehaviorSubject<string>('');

  private searchSub = new Subscription();

  constructor(private router: Router) {}

  public ngOnInit() {
    this.searchSub = this.searchValue$
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        catchError((error) => of(error)),
      )
      .subscribe((searchTerm) => {
        if (searchTerm) {
          this.router.navigate([ROUTES.BOARDS, ROUTES.SEARCH, searchTerm]);
        }
      });
  }

  public ngOnDestroy(): void {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
  }
}
