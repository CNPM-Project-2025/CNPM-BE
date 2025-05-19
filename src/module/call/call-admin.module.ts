import { Module } from '@nestjs/common';
import { CallAdminController } from './call-admin.controller';
import { CallAdminService } from './call-admin.service';
import { EventsGateway } from '../events/events.gateway';

@Module({
  controllers: [CallAdminController],
  providers: [CallAdminService, EventsGateway], // đăng ký service + gateway
  exports: [CallAdminService],
})
export class CallAdminModule {}
