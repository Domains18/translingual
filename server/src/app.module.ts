import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranslingualModule } from './translingual/translingual.module';

@Module({
  imports: [TranslingualModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
