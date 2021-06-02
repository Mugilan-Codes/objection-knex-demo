import { knexSnakeCaseMappers } from 'objection';

import { DB_CONNECTION } from '../config';

// REF: https://vincit.github.io/objection.js/recipes/snake-case-to-camel-case-conversion.html
// knexSnakeCaseMappers - automatically convert camelCase to snake case so table names are in snake case but we can use camelCase fields per default

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
