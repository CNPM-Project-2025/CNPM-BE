import { Injectable } from '@nestjs/common';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class CallAdminService {
  constructor(private readonly eventsGateway: EventsGateway) {}

  handleCall(data: { tableId: number }) {
    this.eventsGateway.emitCustomerCall(data);
    return { status: 'success', message: 'gọi nhân viên' + data.tableId };
  }
}
