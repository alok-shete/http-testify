import express from "express";
import { responseMessage } from "../constant";
const testExpressApp = express();
testExpressApp.use(express.json());

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));



testExpressApp.get("/get/:delay/:status", async (req, res) => {
  const { delay = 0, status = 200 } = req.params;
  await wait(Number(delay));
  res.status(Number(status)).json(responseMessage);
});

testExpressApp.post("/post", async (req, res) => {
  const { delay = 0, status = 200 } = req.body;
  await wait(Number(delay));
  res.status(Number(status)).json(responseMessage);
});

testExpressApp.put("/put", async (req, res) => {
  const { delay = 0, status = 200 } = req.body;
  await wait(Number(delay));
  res.status(Number(status)).json(responseMessage);
});

testExpressApp.delete("/delete/:delay/:status", async (req, res) => {
  const { delay = 0, status = 200 } = req.params;
  await wait(Number(delay));
  res.status(Number(status)).json(responseMessage);
});

export default testExpressApp;
