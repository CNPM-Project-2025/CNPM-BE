import { DataSourceOptions, DataSource } from 'typeorm';

export const dataSourceOption: DataSourceOptions = {
  type: 'mysql',
  host: '160.250.134.253',
  port: 3306,
  username: 'root',
  password: 'Ahihi@000',
  database: 'cnpm',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
};
const dataSource = new DataSource(dataSourceOption);
export default dataSource;
