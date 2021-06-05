import User from './user.model';

export const findAll = () => {
  // return User.query().withGraphFetched('channel');
  return User.query();
};

export const findById = (id) => {
  return User.query().findById(id).withGraphFetched('channel');
};
