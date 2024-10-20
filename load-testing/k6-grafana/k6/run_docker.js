import http from 'k6/http';
import { check } from 'k6';

// Define options for each scenario
export let options = {
    discardresponsebodies: true,
    scenarios: {
      contacts: {
        executor: 'ramping-vus',
        startvus: 0,
        stages: [
          { duration: '5s', target: 5000 },
          { duration: '5s', target: 0 },
        ],
        gracefulRampDown: '1s',
      },
    },
  };
  
  
  let options2 = {
    stages: [
        // Ramp-up from 1 to 5 VUs in 10s
        { duration: "10s", target: 5000 },

        // Stay at rest on 5 VUs for 5s
        { duration: "100s", target: 40000 },

        // Ramp-down from 5 to 0 VUs for 5s
        { duration: "15s", target: 0 }
    ]
}
export let options1 ={
    // Define scenarios
    scenarios: {
        // Scenario 1: Load Testing with 2500 concurrent users (1 request per session)
        load_test: {
            executor: 'constant-vus', // Virtual users stay constant
            vus: 250, // 2500 concurrent virtual users
            duration: '1s', // 1 second (each virtual user sends 1 request)
        },
        
        // Scenario 2: Stress Testing with 2500 requests per second for 20 seconds
        stress_test: {
            executor: 'constant-arrival-rate', // Controls the number of requests per second
            rate: 2500, // 2500 requests per second
            timeUnit: '1s', // Time unit for the rate
            duration: '20s', // 20 seconds of continuous stress test
            preAllocatedVUs: 5000, // Pre-allocate VUs to handle the load
            maxVUs: 10000, // Max VUs in case scaling is needed
        },
    },
};

// Main function to make GET requests
export default function () {
    // Replace the URL with your FastAPI app's URL
    let res = http.get('http://fastapi:8000/');

    // Basic check to confirm response status is 200
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
}
