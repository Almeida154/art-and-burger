import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateIngredientsTable1659579766413 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'INGREDIENTS',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'text' },
          { name: 'price', type: 'numeric' },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('INGREDIENTS');
  }
}
