# HTTPtestify

> HTTPtestify is a versatile library for testing HTTP APIs in Node.js environments. It provides a promise-based API inspired by Axios, allowing you to make HTTP requests, perform assertions on responses, and conduct integration testing with ease.

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

You can install HTTPtestify using npm:

```bash
npm install http-testify
```

## Usage

### Making HTTP Requests

To make HTTP requests using HTTPtestify, you can follow this example:

```javascript
const HTTPtestify = require("http-testify");
const app = require("./your-app"); // Replace with your actual app instance

// Create a mock server instance with the target app and port
const server = HTTPtestify.request(app);

// Make a GET request to a specific route
server
  .get("/api/data")
  .then((response) => {
    console.log("Response from /api/data:", response.data);
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });
```

### Parallel Requests with `all`

You can perform multiple requests in parallel using the all method:

```javascript
// Use promise-based operations
const promises = server
  .all((instance) => [instance.get("/api/data1"), instance.get("/api/data2")])
  .then((responses) => {
    console.log("All responses:", responses);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
```

## Docs

HTTPtestify provides a variety of methods to facilitate testing HTTP interactions. Check the [documentation](https://alok-shete.github.io/http-testify/) for detailed information.

## Contributing

Contributions to HTTPtestify are welcome! Feel free to submit issues and pull requests on the [GitHub repository](https://github.com/alok-shete/http-testify).

## Donate

Please consider donating if you think HTTPtestify is helpful to you or that my work is valuable. I am happy if you can help me [buy a cup of coffee. ❤️](https://www.buymeacoffee.com/shetalok)

## License

This project is licensed under the [MIT License](https://github.com/alok-shete/http-testify/blob/main/LICENSE).
