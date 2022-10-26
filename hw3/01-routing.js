const http = require("http");
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// http://localhost:5001/check-cookies should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const server = http.createServer((req, res) => {
  const routes = [
    "welcome",
    "redirect",
    "redirected",
    "cache",
    "cookie",
    "check-cookies",
    "other",
  ];

  let getRoutes = () => {
    let result = "";

    routes.forEach(
      (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
    );

    return result;
  };

  if (req.url === "/") {
    let routeResults = getRoutes();

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h1>Exercise 01</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.end();
  }

  // Add your code here

  if (req.method === "GET" && req.url === "/welcome") {
    console.log("Hello Welcome!");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h2>Hello, you have made it to the welcome route!</h2>");
    res.end();
  } else if (req.method === "GET" && req.url === "/redirect") {
    console.log("Hello Redirect");
    res.writeHead(302, { Location: "http://localhost:5001/redirected" });
    res.end();
  } else if (req.method === "GET" && req.url === "/redirected") {
    console.log("Hello Redirected");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h2>redirect -> redirected Reached!</h2>");
    res.end();
  } else if (req.method === "GET" && req.url === "/cache") {
    console.log("Hello Cache");
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Cache-Control": "max-age=86400",
    });
    res.write("<h2>this resource was cached</h2>");
    res.end();
  } else if (req.method === "GET" && req.url === "/cookie") {
    console.log("Hello cookie");
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Set-Cookie": ["hello=world; Expires=3600", "World=Hello"],
    });
    res.write("<h2>cookies... yummm</h2>");
    res.end();
  } else if (req.method === "GET" && req.url === "/check-cookies") {
    console.log("Hello check-cookies");
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    if (req.headers?.cookie.indexOf("hello=") !== -1) {
      res.write("<h2>Yes</h2>");
    } else {
      res.write("<h2>No</h2>");
    }
    res.end();
  } else if (req.method === "GET" && req.url !== "/other") {
    console.log("Hello other");
    res.writeHead(200, { "Content-Type": "Text/html" });
    res.write("<h2>404 Page not found!</h2>");
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
