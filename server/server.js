const express = require('express');
const path = require('path');
const redisController = require('./controllers/redisControllers.js');

const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../../assets')));

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/token', redisController.setToken, (req, res) => {
  res.status(200).json({ success: 'ok' });
});

app.post('/checktoken', redisController.checkToken, (req, res) => {
  console.log('res.locals.check', res.locals.check);
  res.status(200).json({ token: res.locals.check });
});

app.post('/data', redisController.setData, (req, res) => {
  res.status(200).json({ success: 'good' });
});

app.post('/getData', redisController.getData, (req, res) => {
  res.status(200).json({ data: res.locals.finalData });
});

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