# Requests

> HTTPtestify offers versatile options for making HTTP requests, allowing you to interact with API endpoints using various HTTP methods like GET, POST, PUT, DELETE, and more. Below, we'll explore how to perform basic HTTP requests and advanced operations.

## Basic Request

In HTTPtestify, you can make basic HTTP requests using various HTTP methods like GET, POST, PUT, DELETE, etc. Here, we'll focus on making a simple GET request.

To get started, create a mock server instance with your target app, and then use it to make a request.

```javascript
const HTTPtestify = require("http-testify");
const app = require("./your-app"); // Replace with your actual app instance

// Create a mock server instance with the target app and port
const server = HTTPtestify.request(app);

// Make a GET request to a specific route
server
  .get("/api/data")
  .then((response) => {
    // `response.data` contains the response body data, which varies based on the server's response content.
    console.log("Response Data:", response.data);
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });
```

Replace `./your-app` with the actual path to your app instance file. This example demonstrates making a GET request, but you can use other HTTP methods similarly.

## Promise.all

HTTPtestify provides a convenient way to make multiple HTTP requests in parallel using the `all` method. This is useful when you need to fetch data from multiple API endpoints simultaneously and wait for all responses.

Here's an example of how to use `all` to make parallel requests:

```javascript
const HTTPtestify = require("http-testify");
const app = require("./your-app"); // Replace with your actual app instance

// Create a mock server instance with the target app and port
const server = HTTPtestify.request(app);

// Use promise-based operations
server
  .all((instance) => [instance.get("/api/data1"), instance.get("/api/data2")])
  .then((responses) => {
    console.log("All responses:", responses);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
```

In this example, we use `server.all` to send two GET requests in parallel to `/api/data1` and `/api/data2`. The `promises` variable contains an array of promises that resolve when all requests are complete.

## Promise.race

With HTTPtestify, you can also race multiple HTTP requests using the `race` method. This is useful when you want to retrieve data from multiple endpoints but only need the response from the first completed request.

Here's an example of how to use `race`:

```javascript
const HTTPtestify = require("http-testify");
const app = require("./your-app"); // Replace with your actual app instance

// Create a mock server instance with the target app and port
const server = HTTPtestify.request(app);

// Use promise-based operations
server
  .race((instance) => [instance.get("/api/data1"), instance.get("/api/data2")])
  .then((response) => {
    console.log("First completed response:", response.data);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
```

In this example, we use `server.race` to race two GET requests to `/api/data1` and `/api/data2`. The `firstResponse`variable contains the response of the first completed request.

## Promise.allSettled

HTTPtestify provides the `allSettled` method to make multiple HTTP requests in parallel and receive an array of response states, including both successful responses and errors. This is helpful when you want to process all responses, whether they succeed or fail.

Here's an example of how to use `allSettled`:

```javascript
const HTTPtestify = require("http-testify");
const app = require("./your-app"); // Replace with your actual app instance

// Create a mock server instance with the target app and port
const server = HTTPtestify.request(app);

// Use promise-based operations
server
  .allSettled((instance) => [instance.get("/api/data1"), instance.get("/api/data2")])
  .then((states) => {
    console.log("Response states:", states);
  });
```

In this example, we use `server.allSettled` to send two GET requests in parallel to `/api/data1` and `/api/data2`. The `responses` variable contains an array of response states, allowing you to inspect both successful responses and errors.
