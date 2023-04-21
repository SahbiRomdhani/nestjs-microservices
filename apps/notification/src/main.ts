import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { RmqService } from '../../../libs/libs';
import { NOTIFICATION_SERVICE } from '../../post/src/constants/services';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(NOTIFICATION_SERVICE));
  await app.startAllMicroservices();
  app.listen(3333);
}
bootstrap();
