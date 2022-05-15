import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { ROUTES } from '../../../constants/routes';

@Component({
  selector: 'rsm-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
})
export class NotFoundPageComponent {
  constructor(private readonly router: Router) {}

  goToHomePage(): void {
    this.router.navigate([ROUTES.ROOT, ROUTES.BOARDS]);
  }
}
