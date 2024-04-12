// redisClient.ts
import Redis from "ioredis";

// Connect to Redis server on localhost. Adjust the options as necessary for your setup.
const redisClient = new Redis(); // default connects to 127.0.0.1:6379

export default redisClient;
