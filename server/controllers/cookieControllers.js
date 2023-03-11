const crypto = require('crypto');
const cookieController = {};

// generate random number, save it to res.locals
cookieController.generateToken = (req, res, next) => {
  const token = crypto.randomInt(0, 100000000);
  console.log('generated token:', token);
  res.locals.token = token;
  return next();
};

// create cookie based on res.locals saved number
cookieController.createCookie = (req, res, next) => {
  if (!res.locals.token) {
    return next({
      log: 'error occured in createCookie - no token on res.locals',
      status: 500,
      message: { err: 'an unknown internal error occured' },
    });
  }
  const token = res.locals.token;
  res.cookie('token', token, { httpOnly: true, expire: new Date() + 86400000 }); // this expires after 24hrs
  return next();
};
