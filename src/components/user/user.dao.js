import { User } from '../../models';

export const findAll = () => {
  // return User.query().withGraphFetched('channel');
  return User.query();
};

export const findById = (id) => {
  return User.query().findById(id).withGraphFetched('channel');
};
