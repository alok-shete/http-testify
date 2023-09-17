<!-- TODO -  -->

# Examples

HTTPtestify allows you to make various HTTP requests, such as GET, POST, PUT, DELETE, and even file uploads. Below are examples demonstrating these request types.

#### GET Request

To make a GET request, use the `.get()` method:

```
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

#### POST Request

To make a POST request, use the `.post()` method:

```
const server = HTTPtestify.request(app);

server
  .post("/api/data", { key: "value" }) // Replace with your request payload
  .then((response) => {
    console.log("POST Response Data:", response.data);
  })
  .catch((error) => {
    console.error("POST Error:", error);
  });
```

#### PUT Request

To make a PUT request, use the `.put()` method:

```
const server = HTTPtestify.request(app);

server
  .put("/api/data/123", { key: "updated-value" }) // Replace with your request payload and resource ID
  .then((response) => {
    console.log("PUT Response Data:", response.data);
  })
  .catch((error) => {
    console.error("PUT Error:", error);
  });
```

#### DELETE Request

To make a DELETE request, use the `.delete()` method:

```
const server = HTTPtestify.request(app);

server
  .delete("/api/data/123") // Replace with the resource ID you want to delete
  .then((response) => {
    console.log("DELETE Response Data:", response.data);
  })
  .catch((error) => {
    console.error("DELETE Error:", error);
  });
```

#### File Upload

To upload a file, use the `.post()` method and include the file in the request payload using the `FormData` object:

```
const server = HTTPtestify.request(app);

const formData = new FormData();
formData.append("file", fileBlob, "file.txt"); // Replace 'fileBlob' with your file data

server
  .post("/api/upload", formData)
  .then((response) => {
    console.log("File Upload Response:", response.data);
  })
  .catch((error) => {
    console.error("File Upload Error:", error);
  });
```

#### Download File

To download a file, you can use the `.get()` method and specify the response type as `arraybuffer`. Here's an example:

```
const server = HTTPtestify.request(app);

server
  .get("/api/download/file.pdf", { responseType: "arraybuffer" })
  .then((response) => {
    // The downloaded file is in response.data as an ArrayBuffer.
    // You can save it or process it as needed.
    const downloadedFile = new Blob([response.data], { type: "application/pdf" });
    const url = URL.createObjectURL(downloadedFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = "file.pdf";
    a.click();
  })
  .catch((error) => {
    console.error("Download Error:", error);
  });
```

These examples demonstrate how to perform common HTTP requests, including downloading a file, using HTTPtestify. You can replace the route, payload, and resource ID with your specific API details when using these requests in your application.

#### Authentication

To authenticate requests, set the authentication token in the "Authorization" header:

```
const server = HTTPtestify.request(app);

server
  .get("/api/download/file.pdf", { responseType: "arraybuffer" })
  .then((response) => {
    // The downloaded file is in response.data as an ArrayBuffer.
    // You can save it or process it as needed.
    const downloadedFile = new Blob([response.data], { type: "application/pdf" });
    const url = URL.createObjectURL(downloadedFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = "file.pdf";
    a.click();
  })
  .catch((error) => {
    console.error("Download Error:", error);
  });
```

These examples demonstrate how to perform common HTTP requests, including downloading a file, using HTTPtestify. You can replace the route, payload, and resource ID with your specific API details when using these requests in your application.
