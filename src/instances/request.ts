import axios from "axios";
import { RequestConfigOptions, ServerInstance } from "../types";

/**
 * Creates an Axios instance configured with a base URL and timeout using a provided server instance.
 *
 * @param {ServerInstance} server - The server instance used to determine the base URL.
 * @param {RequestConfigOptions} [configOptions] - Configuration options for the Axios instance.
 * @returns {AxiosInstance} - The configured Axios instance for making requests.
 *
 * @remarks
 * This function creates an Axios instance with the specified base URL derived from the provided `server` instance's `baseUrl`.
 * Additionally, it allows you to customize the Axios instance's behavior by specifying a request timeout using the
 * `configOptions` parameter.
 *
 * @example
 * // Example 1: Creating an Axios instance with default timeout
 * const server = serverInstance(app, { port: 8080 });
 * server.start();
 *
 * const axiosInstance = requestInstance(server);
 * axiosInstance.get("/api/data")
 *   .then(response => console.log(response.data))
 *   .catch(error => console.error(error));
 *
 * @example
 * // Example 2: Creating an Axios instance with custom timeout
 * const server = serverInstance(app, { port: 8080 });
 * server.start();
 *
 * const axiosInstance = requestInstance(server, { timeout: 5000 }); // 5 seconds timeout
 * axiosInstance.get("/api/data")
 *   .then(response => console.log(response.data))
 *   .catch(error => console.error(error));
 *
 * @note
 * If no `configOptions` are provided, the Axios instance will have a default timeout of 30 seconds (30000 milliseconds).
 *
 * @see {@link ServerInstance} The type definition for the extended server instance.
 * @see {@link RequestConfigOptions} The type definition for the configuration options.
 */
export function requestInstance(server: ServerInstance, configOptions?: RequestConfigOptions) {
  const { timeout = 30 * 1000 } = configOptions ?? {};
  const instance = axios.create({
    baseURL: server.baseUrl,
    timeout: timeout,
  });
  return instance;
}
