/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../../../libs/libs/databases/database.module';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi'
import { PostEntity } from './entity/post.entity';
import { RmqModule } from '../../../libs/libs';
import { NOTIFICATION_SERVICE } from './constants/services';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        PORT: Joi.number(),
      }),
      envFilePath: './apps/post/.env',

    }),
    DatabaseModule,

    TypeOrmModule.forFeature([PostEntity]),
    RmqModule.register({name:NOTIFICATION_SERVICE})

  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
