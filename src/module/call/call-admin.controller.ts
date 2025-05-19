import { Controller, Post, Body } from '@nestjs/common';
import { CallAdminService } from './call-admin.service';
import { Public } from '../auth/decorator/public.decorator';

@Controller('call-admin')
export class CallAdminController {
  constructor(private readonly callAdminService: CallAdminService) {}

  @Post()
  @Public()
  callAdmin(@Body() body: { tableId: number }) {
    return this.callAdminService.handleCall(body);
  }
}
