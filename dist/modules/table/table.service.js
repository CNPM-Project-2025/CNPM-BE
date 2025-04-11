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
exports.TableService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const QRCode = require("qrcode");
const table_entity_1 = require("../../entity/table.entity");
const typeorm_2 = require("typeorm");
let TableService = class TableService {
    constructor(tableRepository) {
        this.tableRepository = tableRepository;
    }
    async createTable() {
        const table = this.tableRepository.create();
        const savedTable = await this.tableRepository.save(table);
        const baseUrl = 'https://www.youtube.com/';
        savedTable.qrCode = await QRCode.toDataURL('${baseUrl}?tableId=${savedTable.id}');
        return this.tableRepository.save(savedTable);
    }
    async findOne(id) {
        return this.tableRepository.findOne({
            where: { id },
        });
    }
};
TableService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(table_entity_1.Table)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TableService);
exports.TableService = TableService;
//# sourceMappingURL=table.service.js.map