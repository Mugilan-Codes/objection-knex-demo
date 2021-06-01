import { knexSnakeCaseMappers } from 'objection';

import { DB_CONNECTION } from '../config';

export const development = {
  client: 'mysql2',
  connection: DB_CONNECTION,
  migrations: {
    directory: __dirname + '/migrations',
  },
  seeds: {
    directory: __dirname + '/seeds',
  },
  ...knexSnakeCaseMappers,
};

// TODO: Need to setup production
export const production = {
  client: 'mysql2',
  connection: DB_CONNECTION,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: __dirname + '/migrations',
    tableName: 'knex_migrations',
  },
  ...knexSnakeCaseMappers,
};
