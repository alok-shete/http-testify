import { requestInstance } from "../instances/request";
import {
  RequestConfigOptions,
  RequestInstance,
  ServerInstance,
} from "../types";

/**
 * Configures and returns an instance of a request module based on a provided server instance.
 *
 * @param {ServerInstance} server - The server instance used to determine the base URL and manage server lifecycle.
 * @param {RequestConfigOptions} [configOptions] - Configuration options for the request module.
 * @returns {RequestInstance} - The configured request module instance.
 *
 * @remarks
 * This function configures an instance of a request module, which is created using the `requestInstance` function,
 * based on the provided `server` and `configOptions`. It adds request and response interceptors to the module
 * to manage server lifecycle and handle responses appropriately.
 *
 * @example
 * // Example 1: Creating a default request module
 * const server = serverInstance(app, { port: 8080 });
 * server.start();
 *
 * const defaultRequestModule = defaultModule(server);
 * defaultRequestModule.get("/api/data")
 *   .then(response => console.log(response.data))
 *   .catch(error => console.error(error));
 *
 * @note
 * The request module returned by this function includes interceptors that automatically start the server before sending
 * a request and end the server after receiving a response or an error. If an error occurs, the interceptor checks
 * whether the error has a response and handles it accordingly.
 *
 * @see {@link requestInstance} The function used to create an Axios instance for requests.
 * @see {@link ServerInstance} The type definition for the extended server instance.
 * @see {@link RequestConfigOptions} The type definition for the configuration options.
 * @see {@link RequestInstance} The type definition for the request module instance.
 */

export function defaultModule(
  server: ServerInstance,
  configOptions?: RequestConfigOptions
) {
  const module = requestInstance(server, configOptions) as RequestInstance;

  // Request interceptor
  module.interceptors.request.use((config) => {
    server.start();
    return config;
  });

  module.interceptors.response.use(
    (response) => {
      server.end();
      return response;
    },
    (error) => {
      server.end();
      if (error.response) {
        // If the error has a response, return it even in the case of an error
        return Promise.resolve(error.response);
      } else {
        // If the error doesn't have a response (network error, timeout, etc.)
        return Promise.reject(error);
      }
    }
  );

  return module;
}
