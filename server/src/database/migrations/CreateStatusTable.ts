import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStatusTable1659579741120 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'STATUS',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'status', type: 'text' },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('STATUS');
  }
}
