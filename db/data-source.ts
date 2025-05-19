import { DataSourceOptions, DataSource } from 'typeorm';

export const dataSourceOption: DataSourceOptions = {
  type: 'mysql',
  host:  process.env.BD_HOST!,
  port: Number(process.env.BD_PORT) || 3306,
  username: process.env.BD_USER!,
  password: process.env.BD_PASSWORD!,
  database: process.env.BD_NAME!,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
};
const dataSource = new DataSource(dataSourceOption);
export default dataSource;
