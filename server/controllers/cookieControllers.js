const crypto = require('crypto');

const cookieController = {};

// if token is not included on request body, token will be accessed from req.cookies
cookieController.checkForCookie = (req, res, next) => {
  if (!req.body.token && !req.cookies.token) {
    return next({
      log: 'checkForCookie middleware error - no token available',
      status: 400,
      message: { err: 'token error' },
    });
  }
  res.locals.token = req.body.token ? req.body.token : req.cookies.token;
  return next();
};

// generate cryptographically secure token
cookieController.generateToken = (req, res, next) => {
  console.log('this is a test for generate token');
  const token = crypto.randomInt(0, 100000000);
  console.log('generated token:', token);
  res.locals.token = token;
  return next();
};

// create cookie from secure token value // cookie expires after 24hrs
cookieController.createCookie = (req, res, next) => {
  if (!res.locals.token) {
    return next({
      log: 'error occured in createCookie - no token on res.locals',
      status: 500,
      message: { err: 'an unknown internal error occured' },
    });
  }
  res.cookie('token', res.locals.token, {
    httpOnly: true,
    expire: new Date() + 86400000,
  });
  return next();
};

module.exports = cookieController;
