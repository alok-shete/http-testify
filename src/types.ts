import { AxiosInstance, AxiosResponse } from "axios";
import * as http from "http";

import { Express } from "express";

/**
 * Represents a callback function that provides an Axios instance and returns an array of promises for Axios responses.
 *
 * @param {AxiosInstance} instance - The Axios instance to use for making requests.
 * @returns {Array<Promise<AxiosResponse<any, any>>>} - An array of promises for Axios responses.
 */
export type RequestPromiseCallback = (
  instance: AxiosInstance
) => Array<Promise<AxiosResponse<any, any>>>;

/**
 * Represents an array of Axios responses returned from multiple concurrent requests using `Axios.all`.
 */
export type RequestAllResponse = AxiosResponse<any, any>[];

/**
 * Represents an array of promise settlement results from multiple concurrent requests using `Axios.allSettled`.
 */
export type RequestAllSettledResponse = PromiseSettledResult<
  AxiosResponse<any, any>
>[];

/**
 * Represents an Axios response from a request that wins a race among multiple concurrent requests using `Axios.race`.
 */
export type RequestRaceResponse = AxiosResponse<any, any>;

/**
 * Represents an instance of Axios, extended with additional methods like `all`, `allSettled`, and `race`.
 */
export type RequestInstance = AxiosInstance & {
  all: (callback: RequestPromiseCallback) => Promise<RequestAllResponse>;
  allSettled: (
    callback: RequestPromiseCallback
  ) => Promise<RequestAllSettledResponse>;
  race: (callback: RequestPromiseCallback) => Promise<RequestRaceResponse>;
};

/**
 * Represents the type that can be used to define a server application.
 * It can be an Express application, an http.Server instance, a function that starts the server, or a base URL.
 */
export type RequestApp =
  | Express
  | http.Server
  | ((...res: any) => void | Promise<void>)
  | string;

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
 * Represents an instance of an HTTP server, extended with methods to start and end the server.
 */
export type ServerInstance = http.Server & {
  /**
   * Starts the server instance and makes it listen on the specified port.
   */
  start: () => void;

  /**
   * Ends the server instance, stopping it from listening.
   */
  end: () => void;

  /**
   * The base URL of the server instance.
   */
  baseUrl?: string;
};
