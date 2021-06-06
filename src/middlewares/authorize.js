const protect = (req, res, next) => {
  const { admin } = req.session;

  if (!admin) {
    return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
  }

  req.admin = admin;

  next();
};

export default protect;
