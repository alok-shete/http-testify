import HTTPtestify from "../src";
import http from "http";
import testExpressApp from "./controller/servers/express";
import assert from "node:assert";
import testHttpApp from "./controller/servers/http";
import { responseMessage } from "./controller/constant";

const delayApi = {
  delay: 50,
  status: 201,
};

const testPort = 2020;
const testUrl= `http://localhost:${testPort}`

let testUrlServer: http.Server;

describe("HttpTestify", () => {
  before(() => {
    testUrlServer = http.createServer(testHttpApp).listen(testPort);
  });

  after(() => {
    testUrlServer.close();
  });
  for (const reference of [
    HTTPtestify.request(testHttpApp),
    HTTPtestify.request(http.createServer(testHttpApp)),
    HTTPtestify.request(testExpressApp),
    HTTPtestify.request(testUrl),
  ]) {
    for (const promise of ["all", "race", "allSettled"]) {
      for (const method of ["get", "post", "put", "delete"]) {
        for (const status of [200, 300, 400, 500]) {
          it(`promise:${promise}, method:${method}, status:${status}`, async () => {
            let response: any;
            if (method === "get" || method === "delete") {
              response = await reference[promise]((instance) => [
                instance[method](
                  `/${method}/${delayApi.delay}/${delayApi.status}`
                ),
                instance[method](`/${method}/0/${status}`),
              ]);
            } else if (method === "post" || method === "put") {
              response = await reference[promise]((instance) => [
                instance[method](`/${method}`, {
                  delay: delayApi.delay,
                  status: delayApi.status,
                }),
                instance[method](`/${method}`, {
                  delay: 0,
                  status: status,
                }),
              ]);
            }

            if (promise == "all") {
              assert.equal(response[0].status, delayApi.status);
              assert.deepEqual(response[0].data, responseMessage);
              assert.equal(response[1].status, status);
              assert.deepEqual(response[1].data, responseMessage);
            } else if (promise == "race") {
              assert.equal(response.status, status);
              assert.deepEqual(response.data, responseMessage);
            } else if (promise == "allSettled") {
              assert.equal(response[0].status, "fulfilled");
              assert.equal(response[0].value.status, delayApi.status);
              assert.deepEqual(response[0].value.data, responseMessage);
              assert.equal(response[1].status, "fulfilled");
              assert.equal(response[1].value.status, status);
              assert.deepEqual(response[1].value.data, responseMessage);
            }
          });
        }
      }

      it(`promise:${promise}, method:get, status:200, timeout:1`, async () => {
        try {
          const response = await reference[promise]((instance) => [
            instance.get(`/get/${delayApi.delay}/${delayApi.status}`),
            instance.get(`/get/0/200`, {
              timeout: 1,
            }),
          ]);

          if (promise == "all" || promise == "race") {
            assert.fail("No Error Detected");
          }

          if (promise == "allSettled") {
            assert.equal(response[0].status, "fulfilled");
            assert.equal(response[0].value.status, delayApi.status);
            assert.deepEqual(response[0].value.data, responseMessage);
            assert.equal(response[1].status, "rejected");
          }
        } catch (error) {
          if (promise == "allSettled") {
            assert.fail("Error Detected");
          }
        }
      });
    }
  }
});
