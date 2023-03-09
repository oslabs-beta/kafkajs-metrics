const Redis = require('redis');

const client = Redis.createClient({
  // test.js
  url: 'rediss://red-cg11tq4eoogv676437bg:Y2IG87W5lT5sONA63l61QGxzdtx0FGh6@ohio-redis.render.com:6379',
});

client.on('error', (err) => {
  console.log('err', err);
});

const setRedisToken = async (token, next) => {
  try {
    await client.connect();
    console.log('connected');
    await client.rPush(token, 'true');
  } catch (err) {
    return next({
      log: 'error occurred while connecting to and putting data in redis in setRedisToken: ' + err,
      status: 500,
      message: { err: 'internal server error' },
    });
  }
};

const setData = async (name, data, next) => {
  try {
    await client.set(name, JSON.stringify(data));
  } catch (err) {
    return next({
      log: 'error occurred while putting data in redis in setData function: ' + err,
      status: 500,
      message: { err: 'internal server error' },
    });
  }
};

const setInstances = async (name, token, next) => {
  try {
    await client.rPush(token, name);
  } catch (err) {
    return next({
      log: 'error occurred while putting data in redis in setInstances function: ' + err,
      status: 500,
      message: { err: 'internal server error' },
    });
  }
};

const redisController = {};

redisController.setToken = (req, res, next) => {
  if (!req.body.token) {
    return next({
      log: 'error occured while extracting token from request body in setToken middleware',
      status: 200,
      message: { err: 'recieved unexpected input' },
    });
  }
  const { token } = req.body;
  setRedisToken(token.toString(), next);
  return next();
};

redisController.checkToken = (req, res, next) => {
//   if (!req.body.token) {
//     return next({
//       log: 'error occured while extracting token from request body in setToken middleware',
//       status: 200,
//       message: { err: 'recieved unexpected input' },
//     });
//   }
  const { token } = req.body;
  const checkRedisToken = async (token, client) => {
    try {
      const data = await client.lRange(token.toString(), 0, -1);
      res.locals.check = !!data.length;
      return next();
    } catch (err) {
      return next({
        log: 'error occured while getting data from redis in checkToken middleware: ' + err,
        status: 500,
        message: { err: 'internal server error' },
      });
    }
  };
  checkRedisToken(token, client);
};

redisController.setData = (req, res, next) => {
//   if (!req.body.name || !req.body.data) {
//     return next({
//       log: 'error occured while getting name and data from request body in setData middleware',
//       status: 200,
//       message: { err: 'recieved unexpected input' },
//     });
//   }
  const { name, data } = req.body;
  setData(name, data, next);
  return next();
};

redisController.getData = (req, res, next) => {
//   if (!req.body.token) {
//     return next({
//       log: 'error occured while extracting token from request body in getData middleware',
//       status: 200,
//       message: { err: 'recieved unexpected input' },
//     });
//   }
  const { token } = req.body;
  res.locals.finalData = {};
  const getValues = async (token, client) => {
    const arr = await client.lRange(token.toString(), 0, -1);
    let count = 0;
    arr.forEach(async (data) => {
      if (data !== 'true' && data !== 'ok') {
        res.locals.finalData[data] = await client.get(data);
      }

      count += 1;

      if (count === arr.length) {
        console.log('passes if');
        return next();
      }
    });
  };
  getValues(token, client);
};

redisController.track = (req, res, next) => {
//   if (!req.body.name || !req.body.data) {
//     return next({
//       log: 'error occured while getting name and data from request body in track middleware',
//       status: 200,
//       message: { err: 'recieved unexpected input' },
//     });
//   }
  const { name, token } = req.body;
  setInstances(name, token.toString(), next);
  return next();
};

module.exports = redisController;
