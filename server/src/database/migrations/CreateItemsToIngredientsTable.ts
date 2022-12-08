import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateItemsToIngredientsTable1659579782198
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ITEMS_TO_INGREDIENTS',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'itemId', type: 'uuid' },
          { name: 'ingredientId', type: 'uuid' },
          { name: 'quantity', type: 'numeric' },
        ],
        foreignKeys: [
          {
            name: 'fk_item',
            columnNames: ['itemId'],
            referencedTableName: 'ITEMS',
            referencedColumnNames: ['id'],
          },
          {
            name: 'fk_ingredient',
            columnNames: ['ingredientId'],
            referencedTableName: 'INGREDIENTS',
            referencedColumnNames: ['id'],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ITEMS_TO_INGREDIENTS');
  }
}
