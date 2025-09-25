import { DataSource } from 'typeorm';
import { CharacterSheet } from '../../sheet/entities/sheet.entity';
import { User } from '../../users/entities/user.entity';
import { CharacterAffinity } from '../../sheet/entities/affinity.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'postgres',
  entities: [CharacterSheet, User, CharacterAffinity],
  migrations: ['src/external/database/migrations/*.ts'],
  synchronize: false,
});