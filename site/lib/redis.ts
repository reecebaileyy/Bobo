import Redis from 'ioredis';
import { promisify } from 'util';

const client = new Redis(process.env.REDIS_URL!);
console.log('REDIS_URL:', process.env.REDIS_URL);

client.on('error', (err) => {
  console.error('Redis client error:', err);
});

// Promisify Redis methods
export const getAsync = promisify(client.get).bind(client) as (key: string) => Promise<string | null>;
export const setAsync = promisify(client.set).bind(client) as (
  key: string,
  value: string,
  ...args: Array<string | number>
) => Promise<void>;

export const delAsync = promisify(client.del).bind(client) as (key: string) => Promise<number>;
