import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent {
  currentLanguage: string;
  showLanguages = false;

  toggleLanguages() {
    this.showLanguages = !this.showLanguages;
  }

  setLanguage(language: string) {
    this.currentLanguage = language;
    this.translate.use(language);
    localStorage.setItem('language', language);
    this.showLanguages = false;
  }

  constructor(public translate: TranslateService) {
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.translate.setDefaultLang(this.currentLanguage);
  }
}
