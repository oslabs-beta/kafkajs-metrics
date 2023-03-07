const Redis = require('redis');

const client = Redis.createClient({
    url: 'rediss://red-cg11tq4eoogv676437bg:Y2IG87W5lT5sONA63l61QGxzdtx0FGh6@ohio-redis.render.com:6379',
});

const test = 'hello';

client.on('error', err => {
    console.log('err', err);
});


const setRedisToken = async (token) => {
    await client.connect();
    // await client.set(token, 'ok');
    await client.rPush(token, 'true');
    // await client.expire(token, 300)
    // await client.disconnect();
}

const setData = async (name, data) => {
    // await client.connect();
    await client.set(name, JSON.stringify(data));
    // await client.expire(name, 300);
    // await client.disconnect();
}

const setInstances = async (name, token) => {
    // await client.connect()
    await client.rPush(token, name)
    // await client.disconnect();
}

const redisController = {};

redisController.setToken = (req, res, next) => {
    // const { token } = req.body;
    // //call the stupidFunc to put data into redis
    // const setData = async (client) => {
    //     await client.connect()
    // }
    const { token } = req.body;
    setRedisToken(token.toString())
    return next();
}

redisController.checkToken = (req, res, next) => {
    // queries redis for the token that's inside req.body
    // if result is nill, res.locals.check = false
    // else, res.locals.check = true
    const { token } = req.body;
    console.log('token', token);
    console.log('type of', typeof token);
    const checkRedisToken = async (token, client) => {
        // await client.connect();
        data = await client.lRange(token.toString(), 0, -1);
        // await client.disconnect();
        res.locals.check = data.length ? true : false;
        return next();
    }
    checkRedisToken(token, client);
}

redisController.setData = (req, res, next) => {
    const { name, data } = req.body;
    setData(name, data);
    // set token key, value is an array contain all names
    return next();
}


redisController.getData = (req, res, next) => {
    // value = lrange token 0 -1
    // loop through value, if el is not equal to 'ok',
    // then get el
    const { token } = req.body;
    res.locals.finalData = {};
    const getValues = async (token, client) => {
        const arr = await client.lRange(token.toString(), 0, -1);
        let count = 0;
        arr.forEach( async (data) => {
            if(data !== 'true' && data !== 'ok'){
                res.locals.finalData[data] = await client.get(data);
                // console.log('this is the final data: ', res.locals.finalData[data] )
            } 

            count ++;

            if(count === arr.length) {
                console.log('passes if');
                return next();
            } 
        })
    }
    getValues(token, client);
}

redisController.track = (req, res, next) => {
    const { name, token } = req.body;
    setInstances(name, token.toString());
    return next();
}

module.exports = redisController;