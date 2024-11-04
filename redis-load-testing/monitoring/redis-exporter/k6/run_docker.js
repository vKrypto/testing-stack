import { check } from 'k6';
import redis from 'k6/experimental/redis';

export let options = {
    vus: 1000,        // Number of virtual users
    duration: '10s', // Duration for the test
};

const redisClient = new redis.Client('redis://redis:6379');

export default async function () {
    // Random key-value pair for testing
    const key = `test_key_${__VU}`; // Unique key per VU
    const value = `test_value_${Math.random()}`; // Random value

    // Perform the SET operation
    const setResult = await redisClient.set(key, value);
    check(setResult, { 'SET succeeded': (r) => r === 'OK' });

    // Perform the GET operation
    const getResult = await redisClient.get(key);
    check(getResult, {
        'GET succeeded': (r) => r === value,
        'Value retrieved matches': (r) => r === value,
    });
}
