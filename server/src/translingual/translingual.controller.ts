import { Controller } from '@nestjs/common';
import { TranslingualService } from './translingual.service';

@Controller('translingual')
export class TranslingualController {
  constructor(private readonly translingualService: TranslingualService) {}
}
