/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { Language } from '../models/models';

@Injectable({
  providedIn: 'root',
})

export class LanguageService {
  constructor(private translateService: TranslateService) {}

  getCurrentLanguage(): string {
    return environment.defaultLocale;
  }

  getLanguages(): Language[] {
    const cities: Language[] = [];

    environment.locales.forEach((locale: string) => {
      cities.push({ name: locale });
    });

    return cities;
  }

  changeLocale(selectedLanguage: string) {
    this.translateService.use(selectedLanguage);
  }
}
