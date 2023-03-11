const express = require('express');
const path = require('path');
const redisController = require('./controllers/redisControllers.js');
const cookieController = require('./controllers/cookieControllers.js');

const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../../assets')));

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
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
// *** ADD BCRYPT FUNCTIONALITY
app.post('/token', redisController.setToken, (req, res) => {
  res.status(200).json({ success: 'ok' });
});

// coming from mainTokenPage onclick for authenticate button - verifies that token on req body exists as key in Redis database, returns true or false { token: true/false }
app.post('/checktoken', redisController.checkToken, (req, res) => {
  console.log('res.locals.check', res.locals.check);
  res.status(200).json({ token: res.locals.check });
});

// coming from kafkaMetrics addMetrics/index.js and sent on an setInterval of 5000ms, req.body includes data object; if this is the first time data is set for this consumer instance, a key is created in Redis with consumer name and value is set to data obj; when this occurs again, saved data object is overwritten with new req data object
app.post('/data', redisController.setData, (req, res) => {
  res.status(200).json({ success: 'good' });
});

// coming from mainChartPage in updateState and componentDidMount - req.body includes token. getData controller accesses array list value in Redis associated with token, then uses consumer names from that array to access all consumer's data metrics objects. res.locals.finalData is an object containing consumer names as keys and their data objects as associated values
app.post('/getData', redisController.getData, (req, res) => {
  res.status(200).json({ data: res.locals.finalData });
});

// coming from kafkaMetrics addMetrics/index.js, req.body includes name: combinedName and token: token; redisController.track pushes name to Redis token value list
app.post('/track', redisController.track, (req, res) => {
  res.status(200).json({ success: 'ok' });
});

app.use((req, res) => res.status(404).send('Page not found'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'unknown error',
    status: 500,
    message: { err: 'an error occurred' },
  };
  const error = Object.assign({}, defaultErr, err);
  console.log(defaultErr.log);
  return res.status(error.status).json(error.message);
});

app.listen(3000, () => {
  console.log('server listening on port 3000');
});

module.exports = app;
