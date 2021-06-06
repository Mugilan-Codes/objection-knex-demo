import user from './user';

import post from './post';
import admin from './admin';

export default (app) => {
  app.use('/api/v1/users', user);

  app.use('/api/v1/posts', post);
  app.use('/api/v1/admin', admin);
};
