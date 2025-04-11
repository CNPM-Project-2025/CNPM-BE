"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const menu_item_entity_1 = require("../../entity/menu-item.entity");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../../entity/order.entity");
let OrderService = class OrderService {
    constructor(orderRepository, menuItemRepository) {
        this.orderRepository = orderRepository;
        this.menuItemRepository = menuItemRepository;
    }
    async createOrder(createOrderDto) {
        const { items, isTakeAway, tableId } = createOrderDto;
        const menuItems = await this.menuItemRepository.findBy({
            id: (0, typeorm_2.In)(items.map((item) => item.itemId)),
        });
        const totalPrice = items.reduce((total, item) => {
            const menuItem = menuItems.find((menuItem) => menuItem.id === item.itemId);
            return total + menuItem.price * item.quantity;
        }, 0);
        const order = this.orderRepository.create({
            items: menuItems,
            quantities: items,
            totalPrice,
            status: 'pending',
            isTakeaway: isTakeAway,
            tableId,
        });
        return this.orderRepository.save(order);
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(menu_item_entity_1.MenuItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map