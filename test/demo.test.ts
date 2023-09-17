import { RequestInstance, request } from "../src";
import testExpressApp from "./controller/servers/express";

const instance = request(testExpressApp);

describe("Dev Test Cases", () => {
  before(() => {
    instance.stayConnected();
  });

  after(() => {
    instance.closeConnection();
  });

  it("Simple", async () => {
    const response = await Promise.race([
      instance.post("/post", {
        status: 200,
      }),
      instance.put("/put", {
        delay: 3 * 1000,
        status: 300,
      }),
    ]);
    console.log(response.status);
    console.log(response.data);
  }).timeout(70 * 1000);
});
