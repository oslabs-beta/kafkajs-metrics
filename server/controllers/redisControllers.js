const Redis = require('redis');

const redisClient = Redis.createClient({
    //url in test.js
});

//     const stupidFunc = async (client) => {
//       await client.connect();

//       await client.set('memberId', JSON.stringify({'messagesConsumed': [1, 2, 3]}));
//       const value = await client.get('key');
//       await client.disconnect();  
//     }

//     redisClient.on('error', err => {
//       console.log('err', err);
//     })

//     stupidFunc(redisClient);
//   }

const redisController = {};

redisController.setToken = (req, res, next) => {
    const { token } = req.body;
    //call the stupidFunc to put data into redis
    return next();
}

module.exports = redisController;