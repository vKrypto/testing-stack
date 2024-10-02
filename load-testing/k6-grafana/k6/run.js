import http from 'k6/http';
import { check } from 'k6';


// 2500 req at once(individual sessions)
let case_1 = {
    vus: 2500, // 2000 Virtual Users (VUs) to run in parallel
    duration: '1s', // Duration for which the VUs will send requests (effectively all at once)
};

// 2500 req/sec for 10 sec
let case_2 = {
    vus: 2500,
    duration: '10s',
}

// ramp-up from 1000 req/sec to 3000 req/sec
let case_3 = {
    executor: 'ramping-vus',
    startVUs: 10, // Start with 10 VUs
    stopVUs: 100, // Ramp up to 100 VUs
    stages: [
        { target: 1000, duration: '5s' }, // Ramp up to 1000 requests per second over 5 seconds
        { target: 1500, duration: '5s' }, // Ramp up to 1500 requests per second over the next 5 seconds
        { target: 2000, duration: '5s' }, // Ramp up to 2000 requests per second for the next 5 seconds
        { target: 2500, duration: '5s' }, // Ramp up to 2500 requests per second for the next 5 seconds
        { target: 3000, duration: '5s' }, // Ramp up to 3000 requests per second for the next 5 seconds
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% of requests should be below 1000ms
        http_req_failed: ['rate<0.00'], // http errors should be less than 1%
    },
};

// ramp-up linearly from 1500-5000 req/sec
let case_4 = {
    executor: 'ramping-vus',
    startVUs: 1500, // Start with 10 VUs
    stopVUs: 5000, // Ramp up to 100 VUs
    duration: '15s', // Duration for the test
}

let case_5 = {
    executor: 'per-vu-iterations',
    vus: 65, // number of accumulated workers
    iterations: 200, // Total iterations for all users
    duration: '10s',
};

let case_6 = {
    executor: 'shared-iterations',
    vus: 5, // Number of virtual users
    iterations: 100, // Total number of iterations
    duration: '10s',
};

let case_7 = {
    executor: 'throttle',
    vus: 100, // Number of virtual users
    duration: '10s', // Duration for the test
    rps: 1000, // Limit to 100 requests per second
};

let case_8 = {
    executor: 'arrival-rate',
    rate: 100, // Spawn 10 new VUs per second
    timeUnit: '1s', // Time unit for the rate (10 VUs per second)
    duration: '30s', // Duration for the test
    preAllocatedVUs: 0, // Number of VUs that can be reused
    maxVUs: 10000, // Maximum number of VUs to allocate
};



export let options = case_1;
// Main function to make GET requests
export default function () {
    // Replace the URL with your FastAPI app's URL
    let res = http.get('http://127.0.0.1:8000/');

    // Basic check to confirm response status is 200
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
}
