import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

import { PORT } from './config';
import { setupDb } from './db';
import { logger } from './utils';
import { morgan, rateLimiter, session } from './middlewares';
import mountRoutes from './routes';

const app = express();

setupDb();

// use session or jwt
app.use(session);

app.use(express.json());

// Middlewares
app.use(morgan);
app.use(helmet());
app.use(cors());
app.use(rateLimiter);
app.use(compression());

app.get('/', (req, res) => {
  res.send('<h1>Hello from Objection-Knex Tutorial</h1>');
  logger.info('I am working');
});

mountRoutes(app);

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT} -> http://localhost:${PORT}`);
});
