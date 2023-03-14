const Redis = require('redis');

const client = Redis.createClient({
  // test.js
});

client.on('error', (err) => {
  console.log('err', err);
});

const combineName = (bToken, clientName) => `${bToken}-${clientName}`;

// add encrypted token to database
const setRedisToken = async (token, next) => {
  try {
    await client.connect();
    console.log('connected');
    await client.rPush(token, 'true');
    // set token to expire after 24 hours
    await client.expire(token, 86400);
  } catch (err) {
    return next({
      log:
        'error occurred while connecting to and putting data in redis in setRedisToken: ' +
        err,
      status: 500,
      message: { err: 'internal server error' },
    });
  }
};

// verify encrypted token exists in database, then adds consumer data to database
const setData = async (name, data, token, next) => {
  // verify that token exists in database
  try {
    const returnedData = await client.lRange(token, 0, -1);
    if (returnedData.length) {
      // add consumer data to database, set data to expire after 5 minutes
      await client.setEx(name, 300, JSON.stringify(data));
    } else {
      return next({
        log: 'error in setData:  not saved in database',
        status: 400,
        message: { error: 'internal error' },
      });
    }
  } catch (err) {
    return next({
      log:
        'error occurred while putting data in redis in setData function: ' +
        err,
      status: 500,
      message: { err: 'internal server error' },
    });
  }
};

// add consumer instance to encrypted token list in database
const setInstances = async (name, token, next) => {
  try {
    await client.rPush(token, name);
  } catch (err) {
    return next({
      log:
        'error occurred while putting data in redis in setInstances function: ' +
        err,
      status: 500,
      message: { err: 'internal server error' },
    });
  }
};

const redisController = {};

// add encrypted token to database
redisController.setToken = (req, res, next) => {
  if (!res.locals.bToken) {
    return next({
      log: 'error occured while extracting token from request body in setToken middleware',
      status: 500,
      message: { err: 'recieved unexpected input' },
    });
  }
  const token = res.locals.bToken;

  setRedisToken(token.toString(), next);
  return next();
};

// verify token has been added to database
redisController.checkToken = (req, res, next) => {
  if (!res.locals.bToken) {
    return next({
      log: 'error occured while extracting token from request body in setToken middleware',
      status: 500,
      message: { err: 'recieved unexpected input' },
    });
  }
  const token = res.locals.bToken;
  const checkRedisToken = async (token, client) => {
    try {
      const data = await client.lRange(token.toString(), 0, -1);
      res.locals.check = !!data.length;
      return next();
    } catch (err) {
      return next({
        log:
          'error occured while getting data from redis in checkToken middleware: ' +
          err,
        status: 500,
        message: { err: 'internal server error' },
      });
    }
  };
  checkRedisToken(token, client);
};

// verify encrypted token exists in database, then adds consumer data to database
redisController.setData = (req, res, next) => {
  if (!req.body.name || !req.body.data) {
    return next({
      log: 'error occured while getting name and data from request body in setData middleware',
      status: 400,
      message: { err: 'recieved unexpected input' },
    });
  }
  const { name, data } = req.body;
  const { bToken } = res.locals;
  const combinedName = combineName(bToken, name);
  setData(combinedName, data, bToken.toString(), next);
  return next();
};

// retreive data for all consumer instances associated with token
redisController.getData = (req, res, next) => {
  if (!res.locals.bToken) {
    return next({
      log: 'error occured while extracting token from request body in setToken middleware',
      status: 500,
      message: { err: 'recieved unexpected input' },
    });
  }
  const token = res.locals.bToken;
  res.locals.finalData = {};

  // iterate through the list of all the client instances and retrieve data for each one
  const getValues = async (token, client) => {
    const arr = await client.lRange(token.toString(), 0, -1);
    let count = 0;
    arr.forEach(async (data) => {
      if (data !== 'true' && data !== 'ok') {
        let metricsObj = await client.get(data);
        if (!metricsObj) {
          return next({
            log: 'error inside of getValues',
            status: 500,
            message: { err: 'error retrieving consumer data' },
          });
        }
        metricsObj = JSON.parse(metricsObj);
        const { clientName } = metricsObj.data;
        res.locals.finalData[clientName] = JSON.stringify(metricsObj);
      }

      count += 1;

      if (count === arr.length) {
        return next();
      }
    });
  };
  getValues(token, client);
};

// add consumer instance to encrypted token list in database
redisController.track = (req, res, next) => {
  if (!req.body.name || !res.locals.bToken) {
    return next({
      log: 'error occured while getting name and token from request body in track middleware',
      status: 400,
      message: { err: 'recieved unexpected input' },
    });
  }
  const { name } = req.body;
  const { bToken } = res.locals;
  const combinedName = combineName(bToken, name);
  setInstances(combinedName, bToken.toString(), next);
  return next();
};

module.exports = redisController;
