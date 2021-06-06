import { adminService } from '../services';
import { logger } from '../utils';

export const signUp = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const newAdmin = await adminService.createAdmin(username, password);

    logger.debug({ data: { admin: newAdmin } });

    req.session.admin = newAdmin;

    res.status(201).json({ status: 'success', data: { user: newAdmin } });
  } catch (err) {
    logger.error(err);
    res.status(400).json({ status: 'fail', error: err });
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const admin = await adminService.loginAdmin(username, password);
    logger.debug({ data: { admin } });
    if (admin.err_msg) {
      throw Error(admin.err_msg);
    }

    req.session.admin = admin;

    res.status(200).json({ status: 'success' });
  } catch (err) {
    logger.error(err);
    res.status(400).json({ status: 'fail', error: err });
  }
};
