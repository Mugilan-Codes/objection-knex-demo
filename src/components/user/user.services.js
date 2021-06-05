import * as userDAO from './user.dao';

export const getAllUsers = () => {
  return userDAO.findAll();
};

export const getUser = (id) => {
  return userDAO.findById(id);
};
