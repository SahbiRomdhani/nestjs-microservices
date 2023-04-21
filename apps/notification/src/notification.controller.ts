import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '../../../libs/libs';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello() {
    return this.notificationService.allNotifs();
  }
  @EventPattern('post_created')
  async handlePostCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.notificationService.handlepostCreated(data);
    this.rmqService.ack(context);
  }
}
