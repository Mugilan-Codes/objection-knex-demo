import bcrypt from 'bcryptjs';

import { adminDAO } from '../dao';

// TODO: introduce try/catch block in services

export const createAdmin = async (username, password) => {
  const hashPassword = await bcrypt.hash(password, 12);

  const create = await adminDAO.create(username, hashPassword);

  return create;
};

export const loginAdmin = async (username, password) => {
  const user = await adminDAO.findOne(username);
  if (!user) {
    return { err_msg: 'Admin Not Found' };
  }

  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) {
    return { err_msg: 'Invalid Password' };
  }

  return user;
};
