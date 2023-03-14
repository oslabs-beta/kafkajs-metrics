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
  } catch (error) {
    return next({
      log: 'error in encrypt middleware',
      status: 500,
      message: { err: error },
    });
  }
  return next();
};

module.exports = authController;
