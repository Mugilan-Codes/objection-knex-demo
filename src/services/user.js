import { userDAO } from '../dao';

export const getAllUsers = () => {
  return userDAO.findAll();
};

export const getUser = (id) => {
  return userDAO.findById(id);
};
