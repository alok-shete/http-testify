/**
 * HTTPtestify: A versatile and simplified npm package designed for testing scenarios involving HTTP servers and interactions.
 *
 * @module HTTPtestify
 *
 * @remarks
 * The HTTPtestify package provides a convenient way to create mock servers, manage server life cycles,
 * and perform promise-based request operations specifically tailored for testing purposes.
 * It offers an enhanced Axios-based API for simplified HTTP interactions within testing environments.
 *
 * @see {@link request} The function for creating and configuring the request module.
 * @see {@link RequestInstance} The type definition for the request module instance.
 * @see {@link RequestApp} The type definition for the request handler function or existing server instance.
 * @see {@link RequestConfigOptions} The type definition for the configuration options.
 * @see {@link RequestPromiseCallback} The type definition for the callback function that returns promises for requests.
 * @see {@link RequestAllResponse} The type definition for the response of the 'all' promise-based operation.
 * @see {@link RequestAllSettledResponse} The type definition for the response of the 'allSettled' promise-based operation.
 * @see {@link RequestRaceResponse} The type definition for the response of the 'race' promise-based operation.
 */

import { request } from "./request";
import {
  RequestInstance,
  RequestApp,
  RequestConfigOptions,
  RequestPromiseCallback,
  RequestAllSettledResponse,
  RequestRaceResponse,
  RequestAllResponse,
} from "./types";

const HTTPtestify = {
  request: request,
};

export {
  request,
  RequestInstance,
  RequestApp,
  RequestConfigOptions,
  RequestPromiseCallback,
  RequestAllResponse,
  RequestAllSettledResponse,
  RequestRaceResponse,
};

export default HTTPtestify;
