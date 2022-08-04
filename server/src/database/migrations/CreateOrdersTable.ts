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
          { name: 'total_price', type: 'numeric' },
          { name: 'ordered_at', type: 'timestamp' },
          { name: 'status_id', type: 'uuid' },
        ],
        foreignKeys: [
          {
            name: 'fk_status',
            columnNames: ['status_id'],
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
