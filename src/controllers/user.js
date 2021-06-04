import { logger } from '../utils';
import { User } from '../models';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.query();
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
    const user = await User.query().findById(id).withGraphFetched('channel');
    res.status(200).json({ status: 'success', data: { user } });
  } catch (err) {
    logger.error(err);
    // res.status(500).json(err);
    res.status(400).json({ status: 'fail', error: err });
  }
};
