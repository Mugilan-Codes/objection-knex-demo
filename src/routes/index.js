import user from './user';

export default (app) => {
  app.use('/api/v1/user', user);
};
