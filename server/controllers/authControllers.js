const bcrypt = require('bcrypt');

const authController = {};

// encrypts token with defined salt
authController.encrypt = (req, res, next) => {
  const myToken = res.locals.token ? res.locals.token : req.body.token;
  try {
    const hash = bcrypt.hashSync(
      myToken.toString(),
      '$2b$10$oP8KGMJEHQWQ64VN.Ge38e'
    );
    res.locals.bToken = hash;
  } catch (err) {
    return next({
      log: 'error in encrypt middleware: ' + err,
      status: 500,
      message: { err: 'internal server error' },
    });
  }
  return next();
};

module.exports = authController;