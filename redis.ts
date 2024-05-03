import Redis from 'ioredis';

// Use environment variable for Redis host, default to 'localhost' if not set
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = parseInt(process.env.REDIS_PORT) || 6379; // Default Redis port

// Connect to Redis using the environment variable
const redisClient = new Redis(
    redisPort,
    redisHost
);

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

export default redisClient;
