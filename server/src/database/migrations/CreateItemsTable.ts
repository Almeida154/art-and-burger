import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateItemsTable1659579751048 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ITEMS',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'name', type: 'text' },
          { name: 'price', type: 'numeric' },
          { name: 'itemTypeId', type: 'uuid' },
        ],
        foreignKeys: [
          {
            name: 'fk_item_type',
            columnNames: ['itemTypeId'],
            referencedTableName: 'ITEM_TYPES',
            referencedColumnNames: ['id'],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ITEMS');
  }
}
