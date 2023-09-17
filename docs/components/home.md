# HTTPtestify

> HTTPtestify is a powerful and flexible library for testing HTTP APIs in Node.js environments. With its promise-based API, rich feature set, and seamless integration, HTTPtestify simplifies the process of writing effective API tests, making it an essential tool for any developer's testing toolkit.

## What it is

HTTPtestify is a JavaScript library designed to streamline the testing of HTTP APIs in Node.js applications. Whether you're performing integration tests, asserting API responses, or testing complex scenarios, HTTPtestify provides the tools you need to ensure your APIs are reliable, performant, and accurate.

## Features

- **Promise-Based API:** Enjoy a promise-based API that lets you make HTTP requests using async/await and promise chaining, promoting clean and readable code.
- **Integration Testing:** Seamlessly perform integration tests on your HTTP APIs to ensure they function as intended.
- **HTTP Request Methods:** Support for various HTTP request methods, including GET, POST, PUT, DELETE, and more, allowing interaction with diverse API endpoints.
- **Request Customization:** Tailor your requests with ease, adjusting headers, query parameters, and request bodies as required.
- **Response Assertions:** Utilize chainable methods to validate different aspects of responses, such as status codes, headers, and response data.
- **Chaining Requests:** Seamlessly chain requests together, enabling complex testing scenarios with dependent requests.
- **Parallel Requests (All):** Perform multiple requests simultaneously using the all method, receiving an array of responses when all requests complete.
- **Parallel Requests (Race):** Race multiple requests with the race method, resolving with the response of the first completed request.
- **Parallel Requests (AllSettled):** Perform parallel requests using allSettled, resolving with an array of response states, including both successful responses and errors.
- **Custom Port:** Set a custom port between `1` and `65535` for the mock server instance, allowing flexibility in defining the server's listening port.
- **Cancellation:** Cancel pending requests when they're no longer needed, preventing unnecessary processing.
- **Concurrent Requests:** Boost performance by sending multiple requests concurrently.
- **Error Handling:** Automatically handle network errors and HTTP errors, providing comprehensive error information.
- **Proxy Support:** Seamlessly navigate proxies with configuration options for smoother testing.
- **JSON and XML Handling:** Automatically parse JSON responses and optionally support XML responses for easy assertion and testing.
- **Download and Upload Progress:** Monitor progress when dealing with large files, ensuring efficient request handling.
- **Cookie Handling:** Simplify authentication and stateful API testing with methods to manage and assert cookies.
- **Session Persistence:** Maintain session continuity between requests, crucial for scenarios that involve sequential interactions.

## Installation

To get started with HTTPtestify, you'll need to install it using npm. Open your terminal and run the following command:

```bash
npm install http-testify
```

## Usage

**TypeScript**

To use HTTPtestify in a TypeScript project, follow this example:

```ts
import HTTPtestify from "http-testify";
// Replace with your actual app instance
import app from "./your-app";

// Make a GET request to a specific route
HTTPtestify.request(app)
  .get("/api/data")
  .then((response) => {
    console.log("Response from /api/data:", response.data);
  })
  .catch((error: Error) => {
    console.error("Error occurred:", error);
  });
```

**JavaScript**
To use HTTPtestify in a JavaScript project, follow this example:

```js
const HTTPtestify = require("http-testify");
// Replace with your actual app instance
const app = require("./your-app");

// Make a GET request to a specific route
HTTPtestify.request(app)
  .get("/api/data")
  .then((response) => {
    console.log("Response from /api/data:", response.data);
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });
```
