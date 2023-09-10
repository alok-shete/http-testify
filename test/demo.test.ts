import HTTPtestify from "../src";
import testExpressApp from "./controller/servers/express";

describe("Dev Test Cases", () => {
  it("Simple", async () => {
    const response = await HTTPtestify.request(testExpressApp).post("/post", {
      delay: 30 * 100,
      status: 200,
    });
    console.log(response.status);
    console.log(response.data);
  }).timeout(70 * 1000);
});
