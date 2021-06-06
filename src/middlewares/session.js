import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';

import { REDIS_CONNECTION, SESSION_SECRET } from '../config';

let RedisStore = connectRedis(session);
let redisClient = redis.createClient(REDIS_CONNECTION);

const redisSession = session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,
  cookie: {
    secure: false,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: 30 * 1000,
  },
});

export default redisSession;
