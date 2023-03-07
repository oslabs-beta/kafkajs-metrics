const express = require('express');
const redisController = require('./controllers/redisControllers.js');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/token', redisController.setToken, (req, res) => {
    res.status(200).json({success: 'ok'});
})

app.post('/checktoken', redisController.checkToken, (req, res) => {
    console.log('res.locals.check', res.locals.check);
    res.status(200).json({token: res.locals.check});
})

app.post('/data', redisController.setData, (req, res) => {
    res.status(200).json({success: 'good'});
})

app.post('/getData', redisController.getData, (req,res) => {
    res.status(200).json({data: res.locals.finalData});
})

app.post('/track', redisController.track, (req, res) => {
    res.status(200).json({success: 'ok'});
})

// global error handler

app.use((err, req, res, next) => {
    console.log('in global error handler: ', err);
})

app.listen(3000, () => {
    console.log('server listening on port 3000');
});

module.exports = app;