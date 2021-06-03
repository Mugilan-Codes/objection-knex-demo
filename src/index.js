import express from 'express';

import { PORT } from './config';
import { setupDb } from './db';
import User from './models/User';
import { logger } from './utils';
import { morgan } from './middlewares';

const app = express();

setupDb();

app.use(express.json());
app.use(morgan);

app.get('/', (req, res) => {
  res.send('<h1>Hello from Objection-Knex Tutorial</h1>');
  logger.info('I am working');
});

// This is for practice
// TODO: Move to routes, controllers, services
app.get('/user/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.query().findById(id).withGraphFetched('channel');
    res.json(user);
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
});

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT} -> http://localhost:${PORT}`);
});
