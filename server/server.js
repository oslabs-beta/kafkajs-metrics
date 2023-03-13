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

app.get('/docs/*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../docs/', req.params[0]));
});

// generates token, creates cookie and sends token back on request body
app.get(
  '/token',
  cookieController.generateToken,
  cookieController.createCookie,
  (req, res) => {
    res.status(200).json({ token: res.locals.token });
  }
);

// coming from kafkaMetrics index.js fetch request - adds token as key and [true] as value to Redis
// *** ADD BCRYPT FUNCTIONALITY - run through bcrypt before setting token
app.post(
  '/token',
  authController.encrypt,
  redisController.setToken,
  (req, res) => {
    res.status(200).json({ success: 'ok' });
  }
);

// coming from mainTokenPage onclick for authenticate button -
// verifies that token on req body exists as key in Redis database,
// returns true or false { token: true/false }
// *** ADD BCRYPT FUNCTIONALITY
// *** ADD check for cookie if req.token doesn't exist -
// if cookie exists, consider sending it back to frontend to update state token property
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

// coming from kafkaMetrics addMetrics/index.js and sent on an setInterval of 5000ms,
// req.body includes data object; if this is the first time data is set for this consumer instance,
// a key is created in Redis with consumer name and value is set to data obj;
// when this occurs again, saved data object is overwritten with new req data object
// ? add in redisController.checkToken AND include token on req.body in index.js in kafkaMetrics
// *** if checkToken middleware is added, BCRYPT needs to be added
// eventaully: add in authController.encrypt at beginning
app.post(
  '/data',
  authController.encrypt,
  redisController.setData,
  (req, res) => {
    res.status(200).json({ success: 'good' });
  }
);

// coming from mainChartPage in updateState and componentDidMount -
// req.body includes token. getData controller accesses array list value in
// Redis associated with token, then uses consumer names from that array to
// access all consumer's data metrics objects. res.locals.finalData is an
// object containing consumer names as keys and their data objects as associated values
// *** ADD check for cookie if req.token doesn't exist -
// if cookie exists, consider sending it back to frontend to update state token property
// *** ADD BCRYPT
app.post(
  '/getData',
  cookieController.checkForCookie,
  authController.encrypt,
  redisController.getData,
  (req, res) => {
    res.status(200).json({ data: res.locals.finalData });
  }
);

// coming from kafkaMetrics addMetrics/index.js,
// req.body includes name: combinedName and token: token;
// redisController.track pushes name to Redis token value list
// ADD BCRYPT (see redisController.track)
app.post(
  '/track',
  authController.encrypt,
  redisController.track,
  (req, res) => {
    res.status(200).json({ success: 'ok' });
  }
);

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
