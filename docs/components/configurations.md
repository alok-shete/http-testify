# Configurations

> In HTTPtestify, you have the flexibility to configure various settings for your mock server. These configurations allow you to tailor your testing environment to specific needs, ensuring that your API testing process is efficient and effective.

## Port

HTTPtestify allows you to configure the port for your mock server, giving you control over the port used for testing your API endpoints. This configuration is particularly useful when you want to ensure that your mock server runs on a specific port during development and testing.

**Setting the Port**

To set the port for your mock server, follow these steps:

1. Import HTTPtestify into your project:

   ```javascript
   const HTTPtestify = require("http-testify");
   ```

2. Create a mock server instance and specify the desired port:

   ```javascript
   // Replace with your actual app instance
   const app = require("./your-app");

   // Set the desired port (e.g., 8080)
   const port = 8080;

   // Create a mock server instance with the target app and port
   const server = HTTPtestify.request(app, { port });
   ```

   Replace `your-app` with the actual path to your app instance.

3. With the `port` configuration set, your mock server will use the specified port (8080 in this example).

**Benefits of Port Configuration**

- **Port Isolation**: By specifying a port, you ensure that your mock server doesn't interfere with other services running on your development machine.

- **Consistency**: Port configuration ensures consistency in your testing environment, making it easier to handle API requests during development and testing phases.

Configuring the port for your mock server simplifies your testing workflow, allowing you to have fine-grained control over your development environment.

## Timeout

HTTPtestify provides the capability to configure request timeout settings. This configuration allows you to specify how long the mock server should wait for a response before considering a request as timed out. Controlling timeouts is crucial for simulating various network conditions and ensuring your application handles timeouts gracefully.

**Setting the Timeout**

To set the request timeout for your mock server, follow these steps:

1. Import HTTPtestify into your project:

   ```javascript
   const HTTPtestify = require("http-testify");
   ```

2. Create a mock server instance and specify the desired timeout:

   ```javascript
   // Replace with your actual app instance
   const app = require("./your-app");

   // Set the desired timeout in milliseconds (e.g., 5000ms or 5 seconds)
   const timeout = 5000;

   // Create a mock server instance with the target app and timeout
   const server = HTTPtestify.request(app, { timeout });
   ```

   Replace `your-app` with the actual path to your app instance.

3. With the `timeout` configuration set, your mock server will consider requests as timed out if they take longer than the specified timeout duration (5 seconds in this example).

**Benefits of Timeout Configuration**

- **Testing Edge Cases**: You can simulate scenarios where API requests take longer to respond, allowing you to test how your application handles timeouts and delays.

- **Graceful Handling**: Configuring timeouts enables you to verify that your application gracefully handles requests that exceed the defined time limits.

Setting request timeouts with HTTPtestify ensures that your testing environment is versatile and capable of handling different network conditions effectively.
