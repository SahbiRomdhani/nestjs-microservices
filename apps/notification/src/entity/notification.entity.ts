/* eslint-disable prettier/prettier */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    JoinColumn,
    OneToOne
  } from 'typeorm';
import { PostEntity } from '../../../post/src/entity/post.entity';
  
  @Entity('notification')
  export class NotificationEntity {
      @PrimaryGeneratedColumn()
      public id: number;
  
      @Column({ type:'varchar', length: 20 })
      title:string
  
      @OneToOne(() => PostEntity)
      @JoinColumn()
      post:PostEntity

      @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
      public createdAt: Date;
  
 
  }

