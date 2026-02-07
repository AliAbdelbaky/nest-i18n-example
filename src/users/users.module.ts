import { UsersController } from './usersController';
import { UserService } from './users.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { SharedModule } from '../shared/shared.module';
import * as mongooseI18n from 'mongoose-i18n-localize';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory() {
          return UserSchema.plugin(mongooseI18n, {
            locales: ['ar', 'en'],
          });
        },
      },
    ]),
    SharedModule,
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
