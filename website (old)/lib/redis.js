const Redis = require('ioredis');
const { promisify } = require('util');

const client = new Redis(process.env.REDIS_URL);
console.log('REDIS_URL:', process.env.REDIS_URL);
client.on('error', (err) => {
  console.error('Redis client error:', err);
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);

module.exports = {
  getAsync,
  setAsync,
  delAsync,
};
