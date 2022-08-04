import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateItemIngredientsTable1659579782198 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ITEM_INGREDIENTS',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'item_id', type: 'uuid' },
          { name: 'ingredient_id', type: 'uuid' },
        ],
        foreignKeys: [
          {
            name: 'fk_item',
            columnNames: ['item_id'],
            referencedTableName: 'ITEMS',
            referencedColumnNames: ['id'],
          },
          {
            name: 'fk_ingredient',
            columnNames: ['ingredient_id'],
            referencedTableName: 'INGREDIENTS',
            referencedColumnNames: ['id'],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ITEM_INGREDIENTS');
  }
}
