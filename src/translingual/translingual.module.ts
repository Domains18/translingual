import { Module } from '@nestjs/common';
import { TranslingualService } from './translingual.service';
import { TranslingualController } from './translingual.controller';

@Module({
  controllers: [TranslingualController],
  providers: [TranslingualService],
})
export class TranslingualModule {}
