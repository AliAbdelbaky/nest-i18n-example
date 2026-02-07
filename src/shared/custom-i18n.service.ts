import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { TranslateOptions } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class CustomI18nService {
  constructor(private readonly i18n: I18nService) {}

  t(
    country: 'eg' | 'sa',
    key: string,
    options: Partial<TranslateOptions> = {},
  ): Promise<TranslateOptions> {
    return this.i18n.t(country + '.' + key, {
      lang: I18nContext.current()?.lang,
      debug: true,

      ...options,
    });
  }
}
