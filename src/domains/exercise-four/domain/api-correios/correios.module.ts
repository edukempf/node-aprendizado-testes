import { Module } from '@nestjs/common';
import { CorreiosService } from './service/correios.service';

@Module({
  providers: [CorreiosService],
  exports: [CorreiosService],
})
export class CorreiosModule {}
