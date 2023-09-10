import { RequestApp, RequestConfigOptions, RequestInstance } from "./types";
import { serverInstance } from "./instances/server";
import { defaultModule } from "./modules/default";
import { promiseModule } from "./modules/promise";

/**
 * Creates and configures a versatile request module for making HTTP requests.
 *
 * @param {RequestApp} [app] - The application or server instance to be used with the server.
 * @param {RequestConfigOptions} [configOptions] - Configuration options for the request module.
 * @returns {RequestInstance} - The configured request module instance.
 *
 * @remarks
 * This function simplifies the process of creating a flexible request module capable of making various types of requests.
 * It combines the functionality of creating a server instance, configuring the default request module, and integrating
 * promise-based request operations. The resulting `RequestInstance` is an enhanced Axios instance with automatic server
 * lifecycle management and promise-based request capabilities.
 *
 * @example
 * // Example 1: Creating a request module and making a GET request
 * const requestModule = request(app, { port: 8080 });
 * requestModule.get("/api/data")
 *   .then(response => console.log(response.data))
 *   .catch(error => console.error(error));
 *
 * @example
 * // Example 2: Using promise-based request operations
 * const requestModule = request(app, { port: 8080 });
 * requestModule.all((instance) => [
 *   instance.get("/api/data1"),
 *   instance.get("/api/data2"),
 * ])
 * .then((responses) => {
 *   console.log("All responses:", responses);
 * })
 * .catch((error) => {
 *   console.error("An error occurred:", error);
 * });
 *
 * @note
 * The `request` function provides a powerful and flexible way to manage HTTP requests with automatic server lifecycle
 * management and built-in promise-based request operations.
 *
 * @see {@link RequestApp} The type definition for the request handler function or existing server instance.
 * @see {@link RequestConfigOptions} The type definition for the configuration options.
 * @see {@link RequestInstance} The type definition for the request module instance.
 * @see {@link serverInstance} The function for creating an HTTP server instance.
 * @see {@link defaultModule} The function for configuring the default request module.
 * @see {@link promiseModule} The function for creating a promise-based module.
 */
export function request(
  app?: RequestApp,
  configOptions?: RequestConfigOptions
): RequestInstance {
  const server = serverInstance(app, configOptions);
  const module = defaultModule(server, configOptions);
  module.all = promiseModule(server, configOptions).all;
  module.allSettled = promiseModule(server, configOptions).allSettled;
  module.race = promiseModule(server, configOptions).race;
  return module;
}
