import * as userService from './user.services';
import { logger } from '../utils';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    logger.debug({ results: users.length, data: { users } });
    res
      .status(200)
      .json({ status: 'success', results: users.length, data: { users } });
  } catch (err) {
    logger.error(err);
    res.status(400).json({ status: 'fail', error: err });
  }
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userService.getUser(id);
    res.status(200).json({ status: 'success', data: { user } });
  } catch (err) {
    logger.error(err);
    res.status(400).json({ status: 'fail', error: err });
  }
};
