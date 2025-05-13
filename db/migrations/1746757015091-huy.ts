import { MigrationInterface, QueryRunner } from "typeorm";

export class Huy1746757015091 implements MigrationInterface {
    name = 'Huy1746757015091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`suppliers\` CHANGE \`name\` \`name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`suppliers\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`image\` \`image\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`food_items\` DROP FOREIGN KEY \`FK_bf31353b77c5507183f82b7a28a\``);
        await queryRunner.query(`ALTER TABLE \`food_items\` CHANGE \`image\` \`image\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`food_items\` CHANGE \`category_id\` \`category_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_details\` DROP FOREIGN KEY \`FK_08f0d16ed60b199a4973097255d\``);
        await queryRunner.query(`ALTER TABLE \`purchase_order_details\` DROP FOREIGN KEY \`FK_d3b4369887dd815c0b52023ddca\``);
        await queryRunner.query(`ALTER TABLE \`purchase_order_details\` CHANGE \`purchase_order_id\` \`purchase_order_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_details\` CHANGE \`product_id\` \`product_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`purchase_orders\` DROP FOREIGN KEY \`FK_d16a885aa88447ccfd010e739b0\``);
        await queryRunner.query(`ALTER TABLE \`purchase_orders\` DROP FOREIGN KEY \`FK_c13036093717212c2c6aa111c73\``);
        await queryRunner.query(`ALTER TABLE \`purchase_orders\` CHANGE \`supplier_id\` \`supplier_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`purchase_orders\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_6e48cc52c4b3983bf0e0c218d6e\``);
        await queryRunner.query(`ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_cb0924625c58c74e228404d898f\``);
        await queryRunner.query(`ALTER TABLE \`order_details\` CHANGE \`billId\` \`billId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_details\` CHANGE \`foodItemId\` \`foodItemId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`bills\` DROP FOREIGN KEY \`FK_d9e410ab4acd856404380028f7e\``);
        await queryRunner.query(`ALTER TABLE \`bills\` CHANGE \`paymentMethod\` \`paymentMethod\` enum ('CASH', 'BANK_TRANSFER') NULL`);
        await queryRunner.query(`ALTER TABLE \`bills\` CHANGE \`table_id\` \`table_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tables\` CHANGE \`qr_code\` \`qr_code\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`food_items\` ADD CONSTRAINT \`FK_bf31353b77c5507183f82b7a28a\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_details\` ADD CONSTRAINT \`FK_08f0d16ed60b199a4973097255d\` FOREIGN KEY (\`purchase_order_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_details\` ADD CONSTRAINT \`FK_d3b4369887dd815c0b52023ddca\` FOREIGN KEY (\`product_id\`) REFERENCES \`food_items\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_orders\` ADD CONSTRAINT \`FK_d16a885aa88447ccfd010e739b0\` FOREIGN KEY (\`supplier_id\`) REFERENCES \`suppliers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_orders\` ADD CONSTRAINT \`FK_c13036093717212c2c6aa111c73\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_6e48cc52c4b3983bf0e0c218d6e\` FOREIGN KEY (\`billId\`) REFERENCES \`bills\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_cb0924625c58c74e228404d898f\` FOREIGN KEY (\`foodItemId\`) REFERENCES \`food_items\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bills\` ADD CONSTRAINT \`FK_d9e410ab4acd856404380028f7e\` FOREIGN KEY (\`table_id\`) REFERENCES \`tables\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bills\` DROP FOREIGN KEY \`FK_d9e410ab4acd856404380028f7e\``);
        await queryRunner.query(`ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_cb0924625c58c74e228404d898f\``);
        await queryRunner.query(`ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_6e48cc52c4b3983bf0e0c218d6e\``);
        await queryRunner.query(`ALTER TABLE \`purchase_orders\` DROP FOREIGN KEY \`FK_c13036093717212c2c6aa111c73\``);
        await queryRunner.query(`ALTER TABLE \`purchase_orders\` DROP FOREIGN KEY \`FK_d16a885aa88447ccfd010e739b0\``);
        await queryRunner.query(`ALTER TABLE \`purchase_order_details\` DROP FOREIGN KEY \`FK_d3b4369887dd815c0b52023ddca\``);
        await queryRunner.query(`ALTER TABLE \`purchase_order_details\` DROP FOREIGN KEY \`FK_08f0d16ed60b199a4973097255d\``);
        await queryRunner.query(`ALTER TABLE \`food_items\` DROP FOREIGN KEY \`FK_bf31353b77c5507183f82b7a28a\``);
        await queryRunner.query(`ALTER TABLE \`tables\` CHANGE \`qr_code\` \`qr_code\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`bills\` CHANGE \`table_id\` \`table_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`bills\` CHANGE \`paymentMethod\` \`paymentMethod\` enum ('CASH', 'BANK_TRANSFER') NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`bills\` ADD CONSTRAINT \`FK_d9e410ab4acd856404380028f7e\` FOREIGN KEY (\`table_id\`) REFERENCES \`tables\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_details\` CHANGE \`foodItemId\` \`foodItemId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_details\` CHANGE \`billId\` \`billId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_cb0924625c58c74e228404d898f\` FOREIGN KEY (\`foodItemId\`) REFERENCES \`food_items\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_6e48cc52c4b3983bf0e0c218d6e\` FOREIGN KEY (\`billId\`) REFERENCES \`bills\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`purchase_orders\` CHANGE \`user_id\` \`user_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`purchase_orders\` CHANGE \`supplier_id\` \`supplier_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`purchase_orders\` ADD CONSTRAINT \`FK_c13036093717212c2c6aa111c73\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_orders\` ADD CONSTRAINT \`FK_d16a885aa88447ccfd010e739b0\` FOREIGN KEY (\`supplier_id\`) REFERENCES \`suppliers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_details\` CHANGE \`product_id\` \`product_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_details\` CHANGE \`purchase_order_id\` \`purchase_order_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_details\` ADD CONSTRAINT \`FK_d3b4369887dd815c0b52023ddca\` FOREIGN KEY (\`product_id\`) REFERENCES \`food_items\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_details\` ADD CONSTRAINT \`FK_08f0d16ed60b199a4973097255d\` FOREIGN KEY (\`purchase_order_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`food_items\` CHANGE \`category_id\` \`category_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`food_items\` CHANGE \`image\` \`image\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`food_items\` ADD CONSTRAINT \`FK_bf31353b77c5507183f82b7a28a\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`image\` \`image\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`suppliers\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`suppliers\` CHANGE \`name\` \`name\` varchar(255) NULL DEFAULT 'NULL'`);
    }

}
