import { Repository } from 'typeorm';
import { MenuItem } from '../../entity/menu-item.entity';
export declare class MenuService {
    private readonly menuItemRepository;
    constructor(menuItemRepository: Repository<MenuItem>);
    getMenu(): Promise<MenuItem[]>;
}
