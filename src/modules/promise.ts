import { requestInstance } from "../instances/request";
import { RequestConfigOptions, RequestPromiseCallback, ServerInstance } from "../types";

/**
 * Creates a promise-based module for making requests using an Axios instance.
 *
 * @param {ServerInstance} server - The server instance used to determine the base URL and manage server lifecycle.
 * @param {RequestConfigOptions} [configOptions] - Configuration options for the promise module.
 * @returns {Object} - An object containing methods for promise-based request operations.
 *
 * @remarks
 * This function creates a module that allows making promise-based requests using an Axios instance. The module provides
 * methods for performing promise-based request operations such as `all`, `allSettled`, and `race`. Each method takes a
 * callback function that returns an array of promises for Axios responses.
 *
 * @example
 * // Example 1: Creating a promise-based module and using 'all'
 * const server = serverInstance(app, { port: 8080 });
 * server.start();
 *
 * const promises = promiseModule(server);
 * promises.all((instance) => [
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
 * The `promiseModule` automatically manages the server lifecycle and provides cancellation capabilities.
 * It's important to note that the provided `RequestConfigOptions` and Axios instance's interceptors can further
 * customize the behavior of the requests.
 *
 * @see {@link requestInstance} The function used to create an Axios instance for requests.
 * @see {@link ServerInstance} The type definition for the extended server instance.
 * @see {@link RequestConfigOptions} The type definition for the configuration options.
 * @see {@link RequestPromiseCallback} The type definition for the callback function that returns promises for requests.
 */
export const promiseModule = (server: ServerInstance, configOptions?: RequestConfigOptions) => {
  /**
   * Creates and configures a request instance for making HTTP requests with attached interceptors.
   *
   * @returns {RequestInstance} - A configured request instance that can be used to make HTTP requests.
   *
   * @remarks
   * This function creates an HTTP request instance using the provided `server` and `configOptions`. It attaches interceptors
   * to the instance's request and response pipelines, allowing for additional processing before requests are sent and after
   * responses are received. The instance is intended to be used for making HTTP requests with the specified configuration.
   *
   * @example
   * // Creating and using a request instance
   * const request = createRequestInstance();
   * request.get('/api/data')
   *   .then((response) => {
   *     console.log(response.data);
   *   })
   *   .catch((error) => {
   *     console.error("Error:", error);
   *   });
   *
   * @note
   * The `server` and `configOptions` parameters are expected to be properly defined and compatible with the `requestInstance` function.
   * Ensure that you have proper error handling in place for potential issues that might occur during the creation and usage of the instance.
   *
   * @throws {Error} An error that may occur during the creation and configuration of the request instance.
   * The specific type of error will depend on the implementation details and potential issues that might arise.
   *
   * @see {@link requestInstance} - The function or class responsible for creating HTTP request instances.
   */
  const createRequestInstance = () => {
    server.start();
    const instance = requestInstance(server, configOptions);

    // Attach the CancelToken to the requests made with this instance
    instance.interceptors.request.use((config) => {
      return config;
    });

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          return Promise.resolve(error.response);
        } else {
          return Promise.reject(error);
        }
      },
    );

    return instance;
  };

  /**
   * Wraps a Promise in a function that handles successful resolution and potential errors while ensuring proper cleanup.
   *
   * @template T - The type of the value that the Promise will resolve to.
   * @param {Promise<T>} promise - The Promise to be processed.
   * @returns {Promise<T>} - A Promise that resolves to the value of the input Promise if successful, or rejects with an error if an error occurs.
   *
   * @remarks
   * This function is designed to encapsulate the processing of a Promise by handling both successful resolution and errors.
   * It ensures that a given Promise is awaited, and if it resolves successfully, the resolved value is returned. If the Promise
   * encounters an error during its execution, the error is caught and a Promise is returned that rejects with the encountered error.
   * Additionally, a cleanup step is performed in the 'finally' block by ending a server connection.
   *
   * @example
   * // Using processPromise to handle a Promise that resolves successfully
   * const successPromise = new Promise((resolve) => setTimeout(() => resolve("Success"), 1000));
   * processPromise(successPromise)
   *   .then((result) => {
   *     console.log(result); // Output: Success
   *   })
   *   .catch((error) => {
   *     console.error("Error:", error); // This block will not be executed in this example
   *   });
   *
   * @example
   * // Using processPromise to handle a Promise that encounters an error
   * const errorPromise = new Promise((_resolve, reject) => setTimeout(() => reject(new Error("Something went wrong")), 1000));
   * processPromise(errorPromise)
   *   .then((result) => {
   *     console.log(result); // This block will not be executed in this example
   *   })
   *   .catch((error) => {
   *     console.error("Error:", error); // Output: Error: Something went wrong
   *   });
   *
   * @note
   * The 'server.end()' operation is performed in the 'finally' block to ensure proper cleanup even in the case of errors.
   * Make sure to handle any potential errors that might arise from 'server.end()' itself.
   *
   * @throws {Error} An error that may occur if the original Promise throws an error during its execution.
   * The specific type of error will be propagated from the original Promise.
   *
   * @see {@link Promise} - MDN documentation on JavaScript Promises.
   */
  const processPromise = async <T>(promise: Promise<T>): Promise<T> => {
    try {
      const result = await promise;
      return result;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      server.end();
    }
  };

  return {
    all: (callback: RequestPromiseCallback) => {
      return processPromise(Promise.all(callback(createRequestInstance())));
    },
    allSettled: (callback: RequestPromiseCallback) => {
      return processPromise(Promise.allSettled(callback(createRequestInstance())));
    },
    race: (callback: RequestPromiseCallback) => {
      return processPromise(Promise.race(callback(createRequestInstance())));
    },
  };
};
