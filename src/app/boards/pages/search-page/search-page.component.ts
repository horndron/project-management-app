import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, Subscription } from 'rxjs';

import { Board } from '../../../models/board';

const SEARCH_VALUE = 'searchValue';

@Component({
  selector: 'rsm-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit, OnDestroy {
  private boards: Board[] = [];
  private routerSub = new Subscription();

  public idResults = [];
  public titleResults = [];
  public membersResults = [];
  public descriptionResults = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routerSub = this.route.params
      .pipe(
        pluck(SEARCH_VALUE),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}
