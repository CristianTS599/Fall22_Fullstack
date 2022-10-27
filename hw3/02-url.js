const { table } = require("console");
const http = require("http");
const qs = require("node:querystring");
const port = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  const routes = [
    "/attributes?hello=world&lorem=ipsum",
    "/items?first=1&second=2&third=3&fourth=4",
    "/characters?spongebob=squarepants&patrick=star&sandy=cheeks",
  ];

  // use the URL interface to work with URLs
  // source: https://developer.mozilla.org/en-US/docs/Web/API/URL
  let url = new URL(req.url, `http://${req.headers.host}`);

  let getRoutes = () => {
    let result = "";

    routes.forEach(
      (elem) => (result += `<li><a href="${elem}">${elem}</a></li>`)
    );

    return result;
  };

  if (req.url === "/") {
    let routeResults = getRoutes();

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h1>Exercise 02</h1>`);

    res.write(`<ul> ${routeResults} </ul>`);
  }

  // Add your code here
  if (req.method === "GET" && req.url.indexOf("/attributes") >= 0) {
    console.log("attributes reached");

    res.writeHead(200, { "Content-Type": "text/html" });

    res.write(CreateTableFromURL(req.url.split("?")[1]));

    res.end();
  } else if (req.method === "GET" && req.url.indexOf("/items") >= 0) {
    console.log("items reached");
    res.writeHead(200, { "Content-Type": "text/html" });

    res.write(CreateTableFromURL(req.url.split("?")[1]));

    res.end();
  } else if (req.method === "GET" && req.url.indexOf("/characters") >= 0) {
    console.log("characters reached");
    res.writeHead(200, { "Content-Type": "text/html" });

    res.write(CreateTableFromURL(req.url.split("?")[1]));

    res.end();
  }

  res.end();
});

const CreateTableFromURL = (url) => {
  let tableHtml = '<table style="border:1px solid black">';
  let tableContent = qs.parse(url);

  Object.keys(tableContent).forEach(
    (key) =>
      (tableHtml = tableHtml.concat(
        "",
        `<tr><td style="border:1px solid black">${key}</td><td style="border:1px solid black">${tableContent[key]}</td></tr>`
      ))
  );
  tableHtml = tableHtml.concat("", "</table>");
  return tableHtml;
};

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
