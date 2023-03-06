const express = require('express');
const redisController = require('./controllers/redisController.js');

const app = express();

app.use(express.json());

app.post('/token', redisController.setToken, (req, res) => {
    res.status(200).json({success: res.locals.test});
})

// global error handler

app.use((err, req, res, next) => {
    console.log('in global error handler: ', err);
})

app.listen(3000, () => {
    console.log('server listening on port 3000');
});

module.exports = app;