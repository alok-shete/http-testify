import HTTPtestify from "../src";
import http from "http";
import testExpressApp from "./controller/servers/express";
import assert from "node:assert";
import testHttpApp from "./controller/servers/http";
import { responseMessage } from "./controller/constant";

const testPort = {
  one: 2021,
  two: 2022,
  three: 2023,
  four: 2024,
};

let testUrlServer: http.Server;
describe("HttpTestify", () => {
  before(() => {
    testUrlServer = http.createServer(testHttpApp).listen(testPort.one);
  });

  after(() => {
    testUrlServer.close();
  });
  for (const reference of [
    HTTPtestify.request(testHttpApp),
    HTTPtestify.request(http.createServer(testHttpApp)),
    HTTPtestify.request(testExpressApp),
    HTTPtestify.request(`http://localhost:${testPort.one}`),
    HTTPtestify.request(testHttpApp, {
      port: testPort.two,
    }).stayConnected(),
    HTTPtestify.request(http.createServer(testHttpApp), {
      port: testPort.three,
    }).stayConnected(),
    HTTPtestify.request(testExpressApp, {
      port: testPort.four,
    }).stayConnected(),
  ]) {
    describe("", () => {
      after(() => {
        reference.closeConnection();
      });
      for (const method of ["get", "post", "put", "delete"]) {
        for (const status of [200, 300, 400, 500]) {
          it(`method:${method}, status:${status}`, async () => {
            let response: any;
            if (method === "get" || method === "delete") {
              response = await reference[method](`/${method}/0/${status}`);
            } else if (method === "post" || method === "put") {
              response = await reference[method](`/${method}`, {
                delay: 0,
                status: status,
              });
            }

            if (response) {
              assert.equal(response.status, status);
              assert.deepEqual(response.data, responseMessage);
            }
          });

          it(`method:${method}, status:${status}, timeout:1`, async () => {
            let response: any;
            try {
              if (method === "get" || method === "delete") {
                response = await reference[method](`/${method}/0/${status}`, {
                  timeout: 1,
                });
              } else if (method === "post" || method === "put") {
                response = await reference[method](
                  `/${method}`,
                  {
                    delay: 0,
                    status: status,
                  },
                  {
                    timeout: 1,
                  },
                );
              }
              assert.fail("No Error Detected");
            } catch (error: any) {
              assert.equal(error.message, "timeout of 1ms exceeded");
            }
          });
        }
      }
    });
  }
});
