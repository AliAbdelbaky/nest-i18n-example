import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';

import { UsersModule } from './users/users.module';
import { MongoModule } from './mongo/mongo.module';

const isProd = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    // Load .env + make config available everywhere
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // If you want to support multiple env files:
      // envFilePath: ['.env', `.env.${process.env.NODE_ENV ?? 'development'}`],
    }),

    // i18n
    I18nModule.forRoot({
      fallbackLanguage: 'ar',

      // ✅ important: avoid leading "/" so it doesn't become absolute in some envs
      loaderOptions: {
        path: path.join(__dirname, 'i18n'),
        // watch only in dev to avoid unnecessary file watchers in prod
        watch: !isProd,
      },

      // Order = priority (query > custom header > accept-language)
      resolvers: [
        new QueryResolver(['lang']),
        new HeaderResolver(['lang-x']),
        AcceptLanguageResolver, // uses "Accept-Language"
      ],
    }),

    UsersModule,
    MongoModule,
  ],
})
export class AppModule {}