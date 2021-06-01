import { Model } from 'objection';
import Knex from 'knex';

import * as config from './knexfile';
import { NODE_ENV } from '../config/env';

// TODO: Pass in environment from calling place (entrypoint of the app)
const setupDb = async () => {
  const db = Knex(config[NODE_ENV]);

  Model.knex(db);
};

export default setupDb;
