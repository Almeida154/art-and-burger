import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderItemsTable1659579772937 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ORDER_ITEMS',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'item_id', type: 'uuid' },
          { name: 'order_id', type: 'uuid' },
        ],
        foreignKeys: [
          {
            name: 'fk_item',
            columnNames: ['item_id'],
            referencedTableName: 'ITEMS',
            referencedColumnNames: ['id'],
          },
          {
            name: 'fk_order',
            columnNames: ['order_id'],
            referencedTableName: 'ORDERS',
            referencedColumnNames: ['id'],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ORDER_ITEMS');
  }
}
