const bcrypt = require('bcrypt');

const authController = {};

authController.encrypt = (req, res, next) => {
  // const saltRounds = 10;
  const myToken = res.locals.token ? res.locals.token : req.body.token;
  console.log('req.body inside of authController', req.body);
  // res.locals.token = myToken;
  // console.log('salt inside encrypt', bcrypt.genSaltSync(10));
  try {
    const hash = bcrypt.hashSync(
      myToken.toString(),
      '$2b$10$oP8KGMJEHQWQ64VN.Ge38e'
    );
    console.log('type', typeof hash);
    console.log('hash inside of authController', hash);
    console.log('type', typeof hash);
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
