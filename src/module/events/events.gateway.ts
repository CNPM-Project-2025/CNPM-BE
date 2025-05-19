import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FoodController } from '../food/food.controller';

@WebSocketGateway({ cors: true, port: 9999 }) // Cho phép từ frontend (React)
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  emitFoodUpdated(food: any) {
    this.server.emit('food_updated', food);
  }

  emitCustomerCall(tableId: number) {
    this.server.emit('customer_call', tableId);
  }
}
