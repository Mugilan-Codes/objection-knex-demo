import { Admin } from '../models';

export const create = (username, password) => {
  return Admin.query().insert({ username, password });
};

export const findOne = (username) => {
  return Admin.query().findOne({ username });
};
