import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TranslingualModule } from './translingual/translingual.module';

@Module({
  imports: [TranslingualModule,
      ConfigModule.forRoot({
        isGlobal: true,
      }),
  ],
})
export class AppModule {}
