import { Component, OnInit } from '@angular/core';
import { Language } from '../../models/models';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'rsm-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss'],
})
export class SelectLanguageComponent implements OnInit {
  selectedLanguage!: string;

  languages: Language[] = [];

  constructor(private readonly languageService: LanguageService) { }

  ngOnInit(): void {
    this.getCurrentLanguage();
    this.getLanguages();
  }

  getCurrentLanguage(): void {
    this.selectedLanguage = this.languageService.getCurrentLanguage();
  }

  getLanguages(): void {
    this.languages = this.languageService.getLanguages();
  }

  changeLocale(language: Language): void {
    this.languageService.changeLocale(language.name);
  }
}
