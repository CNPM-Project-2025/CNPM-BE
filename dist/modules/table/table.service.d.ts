import { Table } from 'src/entity/table.entity';
import { Repository } from 'typeorm';
export declare class TableService {
    private tableRepository;
    constructor(tableRepository: Repository<Table>);
    createTable(): Promise<Table>;
    findOne(id: number): Promise<Table>;
}
