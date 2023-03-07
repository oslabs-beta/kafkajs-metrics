const express = require('express');
const redisController = require('./controllers/redisControllers.js');

const app = express();

app.use(express.json());

app.post('/token', redisController.setToken, (req, res) => {
    res.status(200).json({success: 'ok'});
})

app.post('/checktoken', redisController.checkToken, (req, res) => {
    res.status(200).json({token: res.locals.check});
})

app.post('/data', redisController.setData, (req, res) => {
    res.status(200).json({success: 'ok'});
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