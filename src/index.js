import express from 'express';

import { PORT } from './config';
import { setupDb } from './db';

const app = express();

setupDb();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello from Objection-Knex Tutorial</h1>');
  console.log('I am working');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} -> http://localhost:${PORT}`);
});
