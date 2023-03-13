const Redis = require('redis');

const client = Redis.createClient({
  // test.js
});

client.on('error', (err) => {
  console.log('err', err);
});

const combineName = (bToken, clientName) => `${bToken}-${clientName}`;

const setRedisToken = async (token, next) => {
  try {
    await client.connect();
    console.log('connected');
    await client.rPush(token, 'true');
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

// verifies token exists in database, then adds consumer data to database
const setData = async (name, data, token, next) => {
  // verifies that token exists in database
  console.log('in callback');
  try {
    const returnedData = await client.lRange(token, 0, -1);
    if (returnedData.length) {
      await client.set(name, JSON.stringify(data));
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

// extracting encrypted token, passing in to setRedisToken
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

redisController.checkToken = (req, res, next) => {
  //   if (!req.body.token) {
  //     return next({
  //       log: 'error occured while extracting token from request body in setToken middleware',
  //       status: 200,
  //       message: { err: 'recieved unexpected input' },
  //     });
  //   }
  const token = res.locals.bToken;
  console.log('hashed token inside of checkToken', token);
  const checkRedisToken = async (token, client) => {
    try {
      const data = await client.lRange(token.toString(), 0, -1);
      console.log('data inside of checkToken', data);
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

redisController.setData = (req, res, next) => {
  //   if (!req.body.name || !req.body.data) {
  //     return next({
  //       log: 'error occured while getting name and data from request body in setData middleware',
  //       status: 200,
  //       message: { err: 'recieved unexpected input' },
  //     });
  //   }
  // STRUCTURE OF REQ.BODY:
  // req.body has two properties - data = bodyObj and name = combinedName;
  // bodyObj has two properties: name = token and data = dataObj;
  const { name, data } = req.body;
  console.log('name', name);
  console.log('data', data);
  const { bToken } = res.locals;
  console.log('token, ', bToken);
  const combinedName = combineName(bToken, name);
  setData(combinedName, data, bToken.toString(), next);
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
  const token = res.locals.bToken;
  res.locals.finalData = {};

  // iterate through the array of all the client instances and retrieve data for each one
  const getValues = async (token, client) => {
    await client.disconnect();
    await client.connect();
    const arr = await client.lRange(token.toString(), 0, -1);
    let count = 0;
    console.log('arr', arr);
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
        console.log('metricsObj inside getData', metricsObj);
        const { clientName } = metricsObj.data;
        console.log('clientName inside getData', clientName);
        res.locals.finalData[clientName] = JSON.stringify(metricsObj);
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

// *** TO DO: use Bcrypt to hash token and then create combinedName at line 151;
// everything below 152 stays the same
redisController.track = (req, res, next) => {
  //   if (!req.body.name || !req.body.data) {
  //     return next({
  //       log: 'error occured while getting name and data from request body in track middleware',
  //       status: 200,
  //       message: { err: 'recieved unexpected input' },
  //     });
  //   }
  const { name } = req.body;
  const { bToken } = res.locals;
  const combinedName = combineName(bToken, name);
  setInstances(combinedName, bToken.toString(), next);
  return next();
};

module.exports = redisController;
