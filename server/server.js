const express = require('express');

const app = express();

app.use(express.json());

// global error handler

app.use((err, req, res, next) => {
    console.log('in global error handler: ', err);
})

app.listen(3000, () => {
    console.log('server listening on port 3000');
});

module.exports = app;