import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from './entity/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @InjectRepository(NotificationEntity)
    private readonly repository: Repository<NotificationEntity>,
  ) {}

  async allNotifs(): Promise<NotificationEntity[]> {
    return await this.repository.find({
      relations: ['post'],
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  async handlepostCreated(data: any) {
    this.logger.log('Post created Received :', data);
    const newNotif = await this.repository.save(data);

    return newNotif;
  }
}
