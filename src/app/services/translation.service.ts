import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';@Injectable({  providedIn: 'root'})

export class TranslationService {
  constructor(private translateService: TranslateService) {}

  init(locale = 'fr') {
    this.translateService.addLangs(['en', 'fr']);
    this.translateService.use(locale);
  }
}
