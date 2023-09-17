import { AxiosInstance, AxiosResponse } from "axios";
import * as http from "http";

import { Express } from "express";

export type ANY = any;

/**
 * Represents a callback function that provides an Axios instance and returns an array of promises for Axios responses.
 *
 * @param {AxiosInstance} instance - The Axios instance to use for making requests.
 * @returns {Array<Promise<AxiosResponse<ANY, ANY>>>} - An array of promises for Axios responses.
 */
export type RequestPromiseCallback = (
  instance: AxiosInstance,
) => Array<Promise<AxiosResponse<ANY, ANY>>>;

/**
 * Represents an array of Axios responses returned from multiple concurrent requests using `Axios.all`.
 */
export type RequestAllResponse = AxiosResponse<ANY, ANY>[];

/**
 * Represents an array of promise settlement results from multiple concurrent requests using `Axios.allSettled`.
 */
export type RequestAllSettledResponse = PromiseSettledResult<AxiosResponse<ANY, ANY>>[];

/**
 * Represents an Axios response from a request that wins a race among multiple concurrent requests using `Axios.race`.
 */
export type RequestRaceResponse = AxiosResponse<ANY, ANY>;

/**
 * RequestInstance represents an AxiosInstance with extended functionality for making HTTP requests.
 */
export type RequestInstance = AxiosInstance & {
  /**
   * Performs multiple HTTP requests in parallel and returns an array of responses.
   * @param callback - A function that specifies the requests to be made.
   * @returns A Promise that resolves to an array of responses.
   */
  all: (callback: RequestPromiseCallback) => Promise<RequestAllResponse>;

  /**
   * Performs multiple HTTP requests in parallel and returns an array of response states.
   * Response states include both successful responses and errors.
   * @param callback - A function that specifies the requests to be made.
   * @returns A Promise that resolves to an array of response states.
   */
  allSettled: (callback: RequestPromiseCallback) => Promise<RequestAllSettledResponse>;

  /**
   * Races multiple HTTP requests and returns the response of the first completed request.
   * @param callback - A function that specifies the requests to be raced.
   * @returns A Promise that resolves to the response of the first completed request.
   */
  race: (callback: RequestPromiseCallback) => Promise<RequestRaceResponse>;

  /**
   * Ensures that the connection to the server is maintained, preventing it from being closed.
   * @returns The modified RequestInstance with a maintained connection.
   */
  stayConnected: () => RequestInstance;

  /**
   * Closes the connection to the server.
   */
  closeConnection: () => void;
};

/**
 * Represents the type that can be used to define a server application.
 * It can be an Express application, an http.Server instance, a function that starts the server, or a base URL.
 */
export type RequestApp = Express | http.Server | ((...res: ANY) => void | Promise<void>) | string;

/**
 * Represents configuration options that can be used to customize request-related settings.
 */
export type RequestConfigOptions = {
  /**
   * The port number on which the server should listen.
   */
  port?: number;

  /**
   * The timeout value in milliseconds for requests.
   */
  timeout?: number;
};

/**
 * Represents an instance of an HTTP server, extended with methods to start, end, stay connected, and close the server.
 */
export type ServerInstance = http.Server & {
  /**
   * Starts the server instance and makes it listen on the specified port.
   *
   * @remarks
   * This method starts the server instance and makes it listen on the specified port. If the server is already running, calling this method may have no effect.
   *
   * @example
   * ```typescript
   * // Example: Start the server instance
   * serverInstance.start();
   * // The server starts listening on the specified port.
   * ```
   */
  start: () => void;

  /**
   * Ends the server instance, stopping it from listening.
   *
   * @remarks
   * This method stops the server instance from listening, effectively ending its operation. Subsequent requests to the server will not be accepted after calling this method.
   *
   * @example
   * ```typescript
   * // Example: End the server instance
   * serverInstance.end();
   * // The server stops listening and is no longer active.
   * ```
   */

  end: () => void;

  /**
   * The base URL of the server instance.
   */
  baseUrl?: string;

  /**
   * Ensures that the server remains connected by starting it if not already running.
   *
   * @remarks
   * This method checks if the server is not already running (based on the `keepOpen` flag). If the server is not running, it starts the server instance using the `start` method.
   *
   * @example
   * ```typescript
   * // Example: Ensure the server remains connected
   * serverInstance.stayConnected();
   * // If the server was not already running, it starts and remains connected.
   * ```
   */
  stayConnected: () => void;

  /**
   * Closes the server connection if it is currently open.
   *
   * @remarks
   * This method checks if the server connection is currently open (based on the `keepOpen` flag). If the server connection is open, it closes the server instance using the `end` method.
   *
   * @example
   * ```typescript
   * // Example: Close the server connection if it is open
   * serverInstance.closeConnection();
   * // If the server connection was open, it is closed.
   * ```
   */
  closeConnection: () => void;
};
