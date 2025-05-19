import { Injectable } from '@nestjs/common';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class CallAdminService {
  constructor(private readonly eventsGateway: EventsGateway) {}

  handleCall(data: { message: string }) {
    this.eventsGateway.emitCustomerCall(data);
    return { status: 'success', message: 'Yêu cầu gọi admin đã gửi' };
  }
}
