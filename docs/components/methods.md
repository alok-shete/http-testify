# Methods

HTTPtestify allows you to make various HTTP requests using different methods. Below are examples of how to use HTTPtestify to perform these requests with a brief description of each method.

## GET Request

**Description**

The `GET` method is used to request data from a specified resource.

**Example**

```javascript
const HTTPtestify = require("http-testify");
const app = require("./your-app"); // Replace with your actual app instance

// Create a mock server instance with the target app and port
const server = HTTPtestify.request(app);

server
  .get("/api/data")
  .then((response) => {
    console.log("GET Response Data:", response.data);
  })
  .catch((error) => {
    console.error("GET Error:", error);
  });
```

## POST Request

**Description**

The `POST` method is used to send data to the server for creating a new resource.

**Example**

```javascript
const HTTPtestify = require("http-testify");
const app = require("./your-app"); // Replace with your actual app instance

// Create a mock server instance with the target app and port
const server = HTTPtestify.request(app);

const postData = {
  key1: "value1",
  key2: "value2",
};

server
  .post("/api/create", postData)
  .then((response) => {
    console.log("POST Response Data:", response.data);
  })
  .catch((error) => {
    console.error("POST Error:", error);
  });
```

## DELETE Request

**Description**

The `DELETE` method is used to request the removal of a resource.

**Example**

```javascript
const HTTPtestify = require("http-testify");
const app = require("./your-app"); // Replace with your actual app instance

// Create a mock server instance with the target app and port
const server = HTTPtestify.request(app);

server
  .delete("/api/resource/123")
  .then((response) => {
    console.log("DELETE Response Data:", response.data);
  })
  .catch((error) => {
    console.error("DELETE Error:", error);
  });
```

## HEAD Request

**Description**

The `HEAD` method is similar to GET but used to request only the headers of a resource.

**Example**

```javascript
const HTTPtestify = require("http-testify");
const app = require("./your-app"); // Replace with your actual app instance

// Create a mock server instance with the target app and port
const server = HTTPtestify.request(app);

server
  .head("/api/resource")
  .then((response) => {
    console.log("HEAD Response Headers:", response.headers);
  })
  .catch((error) => {
    console.error("HEAD Error:", error);
  });
```

## OPTIONS Request

**Description**

The `OPTIONS` method is used to describe the communication options for the target resource.

**Example**

```javascript
const HTTPtestify = require("http-testify");
const app = require("./your-app"); // Replace with your actual app instance

// Create a mock server instance with the target app and port
const server = HTTPtestify.request(app);

server
  .options("/api/resource")
  .then((response) => {
    console.log("OPTIONS Response Headers:", response.headers);
  })
  .catch((error) => {
    console.error("OPTIONS Error:", error);
  });
```

## PUT Request

**Description**

The `PUT` method is used to update a resource or create it if it doesn't exist.

**Example**

```javascript
const HTTPtestify = require("http-testify");
const app = require("./your-app"); // Replace with your actual app instance

// Create a mock server instance with the target app and port
const server = HTTPtestify.request(app);

const putData = {
  key1: "updated-value",
};

server
  .put("/api/resource/123", putData)
  .then((response) => {
    console.log("PUT Response Data:", response.data);
  })
  .catch((error) => {
    console.error("PUT Error:", error);
  });
```

## PATCH Request

**Description**

The `PATCH` method is used to apply partial modifications to a resource.

**Example**

```javascript
const HTTPtestify = require("http-testify");
const app = require("./your-app"); // Replace with your actual app instance

// Create a mock server instance with the target app and port
const server = HTTPtestify.request(app);

const patchData = {
  key1: "patched-value",
};

server
  .patch("/api/resource/123", patchData)
  .then((response) => {
    console.log("PATCH Response Data:", response.data);
  })
  .catch((error) => {
    console.error("PATCH Error:", error);
  });
```

These examples demonstrate how to perform HTTP requests using different methods with HTTPtestify. You can replace the route, data, and configuration as needed for your specific use case. The `config` parameter allows you to pass additional AxiosRequestConfig options to customize your requests.

## Request Config

The following is a comprehensive list of configuration options available when making requests with Axios:

```js
{
  // `url` is the server URL that will be used for the request
  url: '/user',

  // `method` is the request method to be used when making the request
  method: 'get', // default

  // `transformRequest` allows changes to the request data before it is sent to the server
  // This is only applicable for request methods 'PUT', 'POST', 'PATCH', and 'DELETE'
  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
  // FormData, or Stream
  // You may modify the headers object.
  transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [function (data) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: {
    ID: 12345
  },

  // `paramsSerializer` is an optional config in charge of serializing `params`
  paramsSerializer: {
    encode?: (param: string): string => { /* Do custom ops here and return transformed string */ }, // custom encoder function; sends Key/Values in an iterative fashion
    serialize?: (params: Record<string, any>, options?: ParamsSerializerOptions ), // mimic pre 1.x behavior and send entire params object to a custom serializer func. Allows consumer to control how params are serialized.
    indexes: false // array indexes format (null - no brackets, false (default) - empty brackets, true - brackets with indexes)
  },

  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', 'DELETE, and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer, FormData (form-data package)
  data: {
    firstName: 'Fred'
  },

  // syntax alternative to send data into the body
  // method post
  // only the value is sent, not the key
  data: 'Country=Brasil&City=Belo Horizonte',

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 1000, // default is `0` (no timeout)

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default

  // `adapter` allows custom handling of requests which makes testing easier.
  // Return a promise and supply a valid response (see lib/adapters/README.md).
  adapter: function (config) {
    /* ... */
  },

  // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
  // This will set an `Authorization` header, overwriting any existing
  // `Authorization` custom headers you have set using `headers`.
  // Please note that only HTTP Basic auth is configurable through this parameter.
  // For Bearer tokens and such, use `Authorization` custom headers instead.
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` indicates the type of data that the server will respond with
  // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
  //   browser only: 'blob'
  responseType: 'json', // default

  // `responseEncoding` indicates encoding to use for decoding responses (Node.js only)
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // `onUploadProgress` allows handling of progress events for uploads
  // browser & node.js
  onUploadProgress: function ({loaded, total, progress, bytes, estimated, rate, upload = true}) {
    // Do whatever you want with the Axios progress event
  },

  // `onDownloadProgress` allows handling of progress events for downloads
  // browser & node.js
  onDownloadProgress: function ({loaded, total, progress, bytes, estimated, rate, download = true}) {
    // Do whatever you want with the Axios progress event
  },

  // `maxContentLength` defines the max size of the http response content in bytes allowed in node.js
  maxContentLength: 2000,

  // `maxBodyLength` (Node only option) defines the max size of the http request content in bytes allowed
  maxBodyLength: 2000,

  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` defines the maximum number of redirects to follow in node.js.
  // If set to 0, no redirects will be followed.
  maxRedirects: 21, // default

  // `beforeRedirect` defines a function that will be called before redirect.
  // Use this to adjust the request options upon redirecting,
  // to inspect the latest response headers,
  // or to cancel the request by throwing an error
  // If maxRedirects is set to 0, `beforeRedirect` is not used.
  beforeRedirect: (options, { headers }) => {
    if (options.hostname === "example.com") {
      options.auth = "user:password";
    }
  },

  // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default

  // `transport` determines the transport method that will be used to make the request. If defined, it will be used. Otherwise, if `maxRedirects` is 0, the default `http` or `https` library will be used, depending on the protocol specified in `protocol`. Otherwise, the `httpFollow` or `httpsFollow` library will be used, again depending on the protocol, which can handle redirects.
  transport: undefined, // default

  // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
  // and https requests, respectively, in node.js. This allows options to be added like
  // `keepAlive` that are not enabled by default.
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // `cancelToken` specifies a cancel token that can be used to cancel the request
  // (see Cancellation section below for details)
  cancelToken: new CancelToken(function (cancel) {
  }),

  // an alternative way to cancel Axios requests using AbortController
  signal: new AbortController().signal,

  // `decompress` indicates whether or not the response body should be decompressed
  // automatically. If set to `true` will also remove the 'content-encoding' header
  // from the responses objects of all decompressed responses
  // - Node only (XHR cannot turn off decompression)
  decompress: true // default

  // `insecureHTTPParser` boolean.
  // Indicates where to use an insecure HTTP parser that accepts invalid HTTP headers.
  // This may allow interoperability with non-conformant HTTP implementations.
  // Using the insecure parser should be avoided.
  // see options https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_http_request_url_options_callback
  // see also https://nodejs.org/en/blog/vulnerability/february-2020-security-releases/#strict-http-header-parsing-none
  insecureHTTPParser: undefined // default

  // transitional options for backward compatibility that may be removed in the newer versions
  transitional: {
    // silent JSON parsing mode
    // `true`  - ignore JSON parsing errors and set response.data to null if parsing failed (old behaviour)
    // `false` - throw SyntaxError if JSON parsing failed (Note: responseType must be set to 'json')
    silentJSONParsing: true, // default value for the current Axios version

    // try to parse the response string as JSON even if `responseType` is not 'json'
    forcedJSONParsing: true,

    // throw ETIMEDOUT error instead of generic ECONNABORTED on request timeouts
    clarifyTimeoutError: false,
  },

  env: {
    // The FormData class to be used to automatically serialize the payload into a FormData object
    FormData: window?.FormData || global?.FormData
  },

  formSerializer: {
      visitor: (value, key, path, helpers) => {}; // custom visitor function to serialize form values
      dots: boolean; // use dots instead of brackets format
      metaTokens: boolean; // keep special endings like {} in parameter key
      indexes: boolean; // array indexes format null - no brackets, false - empty brackets, true - brackets with indexes
  },

  // http adapter only (node.js)
  maxRate: [
    100 * 1024, // 100KB/s upload limit,
    100 * 1024  // 100KB/s download limit
  ]
}
```

## Response Schema

The response schema provides information about the structure of an HTTP response when using Axios:

```javascript
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the HTTP headers that the server responded with
  // All header names are lowercase and can be accessed using the bracket notation.
  // Example: `response.headers['content-type']`
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance in the browser
  request: {}
}

```
