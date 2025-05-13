import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDb1746756243514 implements MigrationInterface {
  name = 'UpdateDb1746756243514';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`suppliers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`description\` varchar(255) NULL, \`status\` int NOT NULL DEFAULT '1', \`address\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_update\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`status\` int NOT NULL DEFAULT '1', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_update\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`image\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`food_items\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`sell_price\` int NOT NULL, \`import_price\` int NOT NULL, \`description\` varchar(255) NOT NULL, \`image\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_update\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`status\` int NOT NULL DEFAULT '1', \`stock\` int NOT NULL, \`category_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`purchase_order_details\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`price\` int NOT NULL, \`purchase_order_id\` int NULL, \`product_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`purchase_orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` enum ('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED') NOT NULL DEFAULT 'PENDING', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`supplier_id\` int NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`roles\` varchar(255) NOT NULL DEFAULT 'User', \`refresh_token\` varchar(255) NULL, \`avatar\` varchar(255) NULL, \`status\` int NOT NULL DEFAULT '1', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_update\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order_details\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`status\` enum ('PLACED', 'PREPARING', 'SERVED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PLACED', \`billId\` int NULL, \`foodItemId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`bills\` (\`id\` int NOT NULL AUTO_INCREMENT, \`paymentMethod\` enum ('CASH', 'BANK_TRANSFER') NULL, \`type\` enum ('DINE_IN', 'TAKE_AWAY') NOT NULL, \`status\` enum ('UNPAID', 'PAID') NOT NULL DEFAULT 'UNPAID', \`totalPrice\` decimal(10,2) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`table_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tables\` (\`id\` int NOT NULL AUTO_INCREMENT, \`qr_code\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`food_items\` ADD CONSTRAINT \`FK_bf31353b77c5507183f82b7a28a\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`purchase_order_details\` ADD CONSTRAINT \`FK_08f0d16ed60b199a4973097255d\` FOREIGN KEY (\`purchase_order_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`purchase_order_details\` ADD CONSTRAINT \`FK_d3b4369887dd815c0b52023ddca\` FOREIGN KEY (\`product_id\`) REFERENCES \`food_items\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`purchase_orders\` ADD CONSTRAINT \`FK_d16a885aa88447ccfd010e739b0\` FOREIGN KEY (\`supplier_id\`) REFERENCES \`suppliers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`purchase_orders\` ADD CONSTRAINT \`FK_c13036093717212c2c6aa111c73\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_6e48cc52c4b3983bf0e0c218d6e\` FOREIGN KEY (\`billId\`) REFERENCES \`bills\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_cb0924625c58c74e228404d898f\` FOREIGN KEY (\`foodItemId\`) REFERENCES \`food_items\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills\` ADD CONSTRAINT \`FK_d9e410ab4acd856404380028f7e\` FOREIGN KEY (\`table_id\`) REFERENCES \`tables\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`bills\` DROP FOREIGN KEY \`FK_d9e410ab4acd856404380028f7e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_cb0924625c58c74e228404d898f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_6e48cc52c4b3983bf0e0c218d6e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`purchase_orders\` DROP FOREIGN KEY \`FK_c13036093717212c2c6aa111c73\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`purchase_orders\` DROP FOREIGN KEY \`FK_d16a885aa88447ccfd010e739b0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`purchase_order_details\` DROP FOREIGN KEY \`FK_d3b4369887dd815c0b52023ddca\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`purchase_order_details\` DROP FOREIGN KEY \`FK_08f0d16ed60b199a4973097255d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`food_items\` DROP FOREIGN KEY \`FK_bf31353b77c5507183f82b7a28a\``,
    );
    await queryRunner.query(`DROP TABLE \`tables\``);
    await queryRunner.query(`DROP TABLE \`bills\``);
    await queryRunner.query(`DROP TABLE \`order_details\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`purchase_orders\``);
    await queryRunner.query(`DROP TABLE \`purchase_order_details\``);
    await queryRunner.query(`DROP TABLE \`food_items\``);
    await queryRunner.query(`DROP TABLE \`categories\``);
    await queryRunner.query(`DROP TABLE \`suppliers\``);
  }
}
