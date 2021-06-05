import { user } from '../components';

export default (app) => {
  app.use('/api/v1/user', user);
};
