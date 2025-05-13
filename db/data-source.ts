import { DataSourceOptions, DataSource } from 'typeorm';

export const dataSourceOption: DataSourceOptions = {
  type: 'mysql',
  host: '192.168.181.183',
  port: 3306,
  username: 'root',
  password: 'Admin@123',
  database: 'cnpm',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
};
const dataSource = new DataSource(dataSourceOption);
export default dataSource;
