/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from '../../../apps/notification/src/entity/notification.entity';
import { PostEntity } from '../../../apps/post/src/entity/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        database: configService.get<string>('DATABASE_NAME'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        autoLoadEntities: true,
        synchronize: true, // never use TRUE in production!
        entities:[NotificationEntity,PostEntity]
      })
    })
  ],
  
})
export class DatabaseModule {}
