import { MigrationInterface, QueryRunner } from "typeorm";

export class Run1746346065152 implements MigrationInterface {
    name = 'Run1746346065152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_bf31353b77c5507183f82b7a28a\` ON \`food_items\``);
        await queryRunner.query(`DROP INDEX \`FK_08f0d16ed60b199a4973097255d\` ON \`purchase_order_details\``);
        await queryRunner.query(`DROP INDEX \`FK_d3b4369887dd815c0b52023ddca\` ON \`purchase_order_details\``);
        await queryRunner.query(`DROP INDEX \`FK_d16a885aa88447ccfd010e739b0\` ON \`purchase_orders\``);
        await queryRunner.query(`DROP INDEX \`FK_c13036093717212c2c6aa111c73\` ON \`purchase_orders\``);
        await queryRunner.query(`DROP INDEX \`IDX_0aa8f1290718849823b581ec14\` ON \`tables\``);
        await queryRunner.query(`ALTER TABLE \`tables\` CHANGE \`number\` \`capcity\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`suppliers\` CHANGE \`name\` \`name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`suppliers\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`image\` \`image\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`food_items\` CHANGE \`image\` \`image\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`food_items\` CHANGE \`category_id\` \`category_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_details\` CHANGE \`purchase_order_id\` \`purchase_order_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_details\` CHANGE \`product_id\` \`product_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`purchase_orders\` CHANGE \`supplier_id\` \`supplier_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`purchase_orders\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roles\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roles\` varchar(255) NOT NULL DEFAULT 'User'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`order_details\` CHANGE \`orderId\` \`orderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_details\` CHANGE \`foodItemId\` \`foodItemId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`bills\` CHANGE \`paymentMethod\` \`paymentMethod\` enum ('CASH', 'BANK_TRANSFER') NULL`);
        await queryRunner.query(`ALTER TABLE \`bills\` CHANGE \`table_id\` \`table_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`nameCustomer\` \`nameCustomer\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`phoneCustomer\` \`phoneCustomer\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`table_id\` \`table_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tables\` DROP COLUMN \`capcity\``);
        await queryRunner.query(`ALTER TABLE \`tables\` ADD \`capcity\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tables\` CHANGE \`qr_code\` \`qr_code\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`food_items\` ADD CONSTRAINT \`FK_bf31353b77c5507183f82b7a28a\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_details\` ADD CONSTRAINT \`FK_08f0d16ed60b199a4973097255d\` FOREIGN KEY (\`purchase_order_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_details\` ADD CONSTRAINT \`FK_d3b4369887dd815c0b52023ddca\` FOREIGN KEY (\`product_id\`) REFERENCES \`food_items\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_orders\` ADD CONSTRAINT \`FK_d16a885aa88447ccfd010e739b0\` FOREIGN KEY (\`supplier_id\`) REFERENCES \`suppliers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_orders\` ADD CONSTRAINT \`FK_c13036093717212c2c6aa111c73\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_147bc15de4304f89a93c7eee969\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_cb0924625c58c74e228404d898f\` FOREIGN KEY (\`foodItemId\`) REFERENCES \`food_items\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bills\` ADD CONSTRAINT \`FK_d9e410ab4acd856404380028f7e\` FOREIGN KEY (\`table_id\`) REFERENCES \`tables\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_3d36410e89a795172fa6e0dd968\` FOREIGN KEY (\`table_id\`) REFERENCES \`tables\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bill_orders\` ADD CONSTRAINT \`FK_d88416c40daa80bea8580e7c465\` FOREIGN KEY (\`bill_id\`) REFERENCES \`bills\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`bill_orders\` ADD CONSTRAINT \`FK_e106f7e97d920a415c81394070d\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bill_orders\` DROP FOREIGN KEY \`FK_e106f7e97d920a415c81394070d\``);
        await queryRunner.query(`ALTER TABLE \`bill_orders\` DROP FOREIGN KEY \`FK_d88416c40daa80bea8580e7c465\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_3d36410e89a795172fa6e0dd968\``);
        await queryRunner.query(`ALTER TABLE \`bills\` DROP FOREIGN KEY \`FK_d9e410ab4acd856404380028f7e\``);
        await queryRunner.query(`ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_cb0924625c58c74e228404d898f\``);
        await queryRunner.query(`ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_147bc15de4304f89a93c7eee969\``);
        await queryRunner.query(`ALTER TABLE \`purchase_orders\` DROP FOREIGN KEY \`FK_c13036093717212c2c6aa111c73\``);
        await queryRunner.query(`ALTER TABLE \`purchase_orders\` DROP FOREIGN KEY \`FK_d16a885aa88447ccfd010e739b0\``);
        await queryRunner.query(`ALTER TABLE \`purchase_order_details\` DROP FOREIGN KEY \`FK_d3b4369887dd815c0b52023ddca\``);
        await queryRunner.query(`ALTER TABLE \`purchase_order_details\` DROP FOREIGN KEY \`FK_08f0d16ed60b199a4973097255d\``);
        await queryRunner.query(`ALTER TABLE \`food_items\` DROP FOREIGN KEY \`FK_bf31353b77c5507183f82b7a28a\``);
        await queryRunner.query(`ALTER TABLE \`tables\` CHANGE \`qr_code\` \`qr_code\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`tables\` DROP COLUMN \`capcity\``);
        await queryRunner.query(`ALTER TABLE \`tables\` ADD \`capcity\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`table_id\` \`table_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`phoneCustomer\` \`phoneCustomer\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`nameCustomer\` \`nameCustomer\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`bills\` CHANGE \`table_id\` \`table_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`bills\` CHANGE \`paymentMethod\` \`paymentMethod\` enum ('CASH', 'BANK_TRANSFER') NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_details\` CHANGE \`foodItemId\` \`foodItemId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_details\` CHANGE \`orderId\` \`orderId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roles\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roles\` enum ('User', 'Admin') NOT NULL DEFAULT ''User''`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\``);
        await queryRunner.query(`ALTER TABLE \`purchase_orders\` CHANGE \`user_id\` \`user_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`purchase_orders\` CHANGE \`supplier_id\` \`supplier_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_details\` CHANGE \`product_id\` \`product_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_details\` CHANGE \`purchase_order_id\` \`purchase_order_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`food_items\` CHANGE \`category_id\` \`category_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`food_items\` CHANGE \`image\` \`image\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`image\` \`image\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`suppliers\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`suppliers\` CHANGE \`name\` \`name\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`tables\` CHANGE \`capcity\` \`number\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_0aa8f1290718849823b581ec14\` ON \`tables\` (\`number\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_c13036093717212c2c6aa111c73\` ON \`purchase_orders\` (\`user_id\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_d16a885aa88447ccfd010e739b0\` ON \`purchase_orders\` (\`supplier_id\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_d3b4369887dd815c0b52023ddca\` ON \`purchase_order_details\` (\`product_id\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_08f0d16ed60b199a4973097255d\` ON \`purchase_order_details\` (\`purchase_order_id\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_bf31353b77c5507183f82b7a28a\` ON \`food_items\` (\`category_id\`)`);
    }

}
