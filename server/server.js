const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const redisController = require('./controllers/redisControllers');
const cookieController = require('./controllers/cookieControllers');
const authController = require('./controllers/authControllers');

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../../assets')));

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// sends library documentation
app.get('/docs/*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../docs/', req.params[0]));
});

// ROUTES ACCESSED BY BROWSER

// generates secure token, creates associated cookie and sends token back on request body
app.get(
  '/token',
  cookieController.generateToken,
  cookieController.createCookie,
  (req, res) => {
    res.status(200).json({ token: res.locals.token });
  }
);

// verifies that token has been encrypted/added to Redis, returns boolean
// (request from authenticate button onClick)
app.post(
  '/checktoken',
  cookieController.checkForCookie,
  authController.encrypt,
  redisController.checkToken,
  (req, res) => {
    console.log('res.locals.check', res.locals.check);
    res.status(200).json({ token: res.locals.check });
  }
);

// returns all consumer data for consumer instances associated with token
app.post(
  '/getData',
  cookieController.checkForCookie,
  authController.encrypt,
  redisController.getData,
  (req, res) => {
    res.status(200).json({ data: res.locals.finalData });
  }
);

// ROUTES ACCESSED BY KAFKJS CLIENT:

// encrypts token and adds encrypted token to Redis
app.post(
  '/token',
  authController.encrypt,
  redisController.setToken,
  (req, res) => {
    res.status(200).json({ success: 'ok' });
  }
);

// consumer data added to Redis after token verification (data sent at default setInterval 5000ms)
app.post(
  '/data',
  authController.encrypt,
  redisController.setData,
  (req, res) => {
    res.status(200).json({ success: 'good' });
  }
);

// adds consumer instance to Redis to be tracked
app.post(
  '/track',
  authController.encrypt,
  redisController.track,
  (req, res) => {
    res.status(200).json({ success: 'ok' });
  }
);

// unknown route handler
app.use((req, res) => res.status(404).send('Page not found'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'unknown error',
    status: 500,
    message: { err: 'an error occurred' },
  };
  const error = Object.assign({}, defaultErr, err);
  console.log(error.log);
  return res.status(error.status).json(error.message);
});

app.listen(3000, () => {
  console.log('server listening on port 3000');
});

module.exports = app;
