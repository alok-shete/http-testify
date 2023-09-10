import * as http from "http";
import { RequestApp, RequestConfigOptions, ServerInstance } from "../types";

/**
 * Creates and manages an HTTP server instance.
 *
 * @param {RequestApp} [app] - The application or server instance to be used with the server.
 * @param {RequestConfigOptions} [configOptions] - Configuration options for the server instance.
 * @returns {ServerInstance} - The created server instance with additional management methods.
 *
 * @remarks
 * This function creates an HTTP server instance based on the provided `app` and `configOptions`. It allows you to
 * start and end the server using the `start` and `end` methods, respectively. The `app` parameter can be a request
 * handler function, an existing server instance, or a base URL. If `app` is a function or an object, the server
 * will be created with it. If `app` is a string, it will be considered as the base URL for the server.
 *
 * @example
 * // Example 1: Creating a server instance with a request handler function
 * const app = (req, res) => {
 *   res.writeHead(200, { "Content-Type": "text/plain" });
 *   res.end("Hello, world!");
 * };
 *
 * const server = serverInstance(app, { port: 8080 });
 * server.start();
 *
 * @example
 * // Example 2: Creating a server instance with an existing server
 * const existingServer = http.createServer();
 * const server = serverInstance(existingServer, { port: 3000 });
 * server.start();
 *
 * @example
 * // Example 3: Creating a server instance with a base URL
 * const baseUrl = "http://localhost:4000";
 * const server = serverInstance(baseUrl);
 * server.start();
 *
 * @note
 * If the provided `app` is not a function, object, or string, an empty server instance will be returned.
 * The `start` and `end` methods are only available if `app` is a function or an object.
 *
 * @throws {Error} If an error occurs during server creation or closure.
 *
 * @see {@link RequestApp} The type definition for the request handler function or existing server instance.
 * @see {@link RequestConfigOptions} The type definition for the configuration options.
 * @see {@link ServerInstance} The type definition for the extended server instance.
 */

export function serverInstance(
  app?: RequestApp,
  configOptions?: RequestConfigOptions
) {
  const { port = 65025 } = configOptions || {};

  let server: ServerInstance;

  if (typeof app === "function") {
    server = http.createServer(app) as ServerInstance;
  } else if (typeof app === "object") {
    server = app as ServerInstance;
  } else {
    server = {} as ServerInstance;
  }

  if (["function", "object"].includes(typeof app)) {
    server.baseUrl = `http://localhost:${port}`;
  } else {
    server.baseUrl = typeof app == "string" ? app : undefined;
  }

  server.start = function () {
    if (
      ["function", "object"].includes(typeof app) &&
      typeof server.address != "undefined"
    ) {
      server = server.listen(port);
    }
  };

  server.end = function () {
    if (
      ["function", "object"].includes(typeof app) &&
      typeof server.getConnections !== "undefined"
    ) {
      server.close();
    }
  };

  return server;
}
