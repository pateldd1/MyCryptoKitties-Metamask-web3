let await = require('asyncawait/await');
let asynchronous = require('asyncawait/async');
const redis = require("redis");
let bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
let RedisCache;

if (!RedisCache) {
    if (process.env.NODE_ENV === 'production') {
        RedisCache = redis.createClient(process.env.REDISCLOUD_URL);
    } else {
        RedisCache = redis.createClient();
    }
    RedisCache.on("error", function (err) {
        console.log("Error " + err);
    });
}

exports.addToSet = asynchronous(function (key, value) {
    // console.log(key, value, "i'm saving this to redis")
    let set = await(RedisCache.getAsync(key));
    if (!set) {
        set = {};
    }
    else {
        set = JSON.parse(set);
    }
    set[value] = true;
    // console.log(set, "this happens when I set txHash")
    RedisCache.set(key, JSON.stringify(set));
});

exports.getSet = asynchronous(function (key) {
    let set = await(RedisCache.getAsync(key));
    // console.log(set)
    if (!set) {
        set = {};
        RedisCache.set(key, JSON.stringify(set));
    } else {
        set = JSON.parse(set);
    }
    return set;
});

exports.removeFromSet = asynchronous(function (key, value) {
    let set = await(RedisCache.getAsync(key));
    if (!set) {
        set = {};
    }
    else {
        set = JSON.parse(set);
    }
    delete set[value];
    RedisCache.set(key, JSON.stringify(set));
});

exports.RedisCache = RedisCache;