import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'D4n13l15.',
  database: 'intersoftware',
  entities: ['user\\entity\\user.entity.ts'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data source connected succesfully');
  })
  .catch((error) => {
    console.error('Error during data source connection');
  });
