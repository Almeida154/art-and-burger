import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrdersTable1659579758700 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ORDERS',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'totalPrice', type: 'numeric' },
          { name: 'orderedAt', type: 'timestamp', default: 'now()' },
          { name: 'statusId', type: 'uuid' },
        ],
        foreignKeys: [
          {
            name: 'fk_status',
            columnNames: ['statusId'],
            referencedTableName: 'STATUS',
            referencedColumnNames: ['id'],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ORDERS');
  }
}
