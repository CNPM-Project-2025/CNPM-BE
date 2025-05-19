import { Injectable } from '@nestjs/common';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class CallAdminService {
  constructor(private readonly eventsGateway: EventsGateway) {}

  handleCall(tableId: number) {
    this.eventsGateway.emitCustomerCall(tableId);
    return { status: 'success', message: 'gọi nhân viên' + tableId };
  }
}
