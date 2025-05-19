import { Controller, Post, Body } from '@nestjs/common';
import { CallAdminService } from './call-admin.service';

@Controller('call-admin')
export class CallAdminController {
  constructor(private readonly callAdminService: CallAdminService) {}

  @Post()
  callAdmin(@Body() body: { message: string }) {
    return this.callAdminService.handleCall(body);
  }
}
