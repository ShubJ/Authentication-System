import { createClient, RedisClientType } from 'redis';
import { CacheClient } from './cache-client.interface';

export class RedisCacheClient implements CacheClient {
  private client: RedisClientType;

  constructor(redisUrl: string) {
    this.client = createClient({ url: redisUrl });
    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });
    this.client.on('connect', () => {
      console.log('Redis Client Connected');
    });
    this.client.on('ready', () => {
      console.log('Redis Client Ready');
    });
    this.client.connect().catch((err) => {
      console.error('Failed to connect to Redis:', err);
      throw err;
    });
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const payload = JSON.stringify(value);
    if (ttlSeconds) {
      await this.client.set(key, payload, { EX: ttlSeconds });
    } else {
      await this.client.set(key, payload);
    }
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}
