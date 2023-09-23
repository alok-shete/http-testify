import { RequestInstance, request } from "../src";
import testExpressApp from "./controller/servers/express";

const instance = request(testExpressApp);

describe.skip("Dev Test Cases", () => {
  before(() => {
    instance.stayConnected();
  });

  after(() => {
    instance.closeConnection();
  });

  it("Simple", async () => {
    const instance = request(testExpressApp);

    instance.stayConnected();
    const respons1 = await instance.post("/post", {
      status: 200,
    });
    console.log(respons1.status);
    console.log(respons1.data);

    const respons = await instance.get("/get/200");
    console.log(respons1.status);
    console.log(respons1.data);

    instance.closeConnection();
  }).timeout(70 * 1000);
});
