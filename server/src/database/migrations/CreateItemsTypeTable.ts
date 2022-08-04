import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateItemsTypeTable1659579732125 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ITEMS_TYPE',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'desc', type: 'text', isUnique: true },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ITEMS_TYPE');
  }
}
