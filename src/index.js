import express from 'express';

import { PORT } from './config';
import { setupDb } from './db';
import User from './models/User';

const app = express();

setupDb();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello from Objection-Knex Tutorial</h1>');
  console.log('I am working');
});

// This is for practice
// TODO: Move to routes, controllers, services
app.get('/user/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.query().findById(id).withGraphFetched('channel');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} -> http://localhost:${PORT}`);
});
