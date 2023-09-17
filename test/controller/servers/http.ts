const url = require("url");
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const responseMessage = {
  message: "This is a normal response",
};

const testHttpApp = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;
  if (
    (pathname.startsWith("/get/") && req.method === "GET") ||
    (req.method === "DELETE" && pathname.startsWith("/delete/"))
  ) {
    const delay = pathname.split("/")[2] || 0;
    const status = pathname.split("/")[3] || 200;
    await wait(Number(delay));

    res.writeHead(Number(status), { "Content-Type": "application/json" });
    res.end(JSON.stringify(responseMessage));
  } else if (
    (pathname === "/post" && req.method === "POST") ||
    (pathname === "/put" && req.method === "PUT")
  ) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const { delay = 0, status = 200 } = JSON.parse(body);
      await wait(Number(delay));
      res.writeHead(Number(status), { "Content-Type": "application/json" });
      res.end(JSON.stringify(responseMessage));
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
};

export default testHttpApp;
