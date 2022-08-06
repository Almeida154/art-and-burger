import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderToItemsTable1659579772937 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ORDERS_TO_ITEMS',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'itemId', type: 'uuid' },
          { name: 'orderId', type: 'uuid' },
        ],
        foreignKeys: [
          {
            name: 'fk_item',
            columnNames: ['itemId'],
            referencedTableName: 'ITEMS',
            referencedColumnNames: ['id'],
          },
          {
            name: 'fk_order',
            columnNames: ['orderId'],
            referencedTableName: 'ORDERS',
            referencedColumnNames: ['id'],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ORDERS_TO_ITEMS');
  }
}
