import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: 5432,
  username: 'docker',
  password: 'docker',
  database: 'docker',
  synchronize: false,
  entities: ['src/app/entities/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
});
