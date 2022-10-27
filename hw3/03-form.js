const { appendFile } = require("fs");
const http = require("http");
const express = require("express");
const { runInNewContext } = require("vm");
const app = express();
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

//const server = http.createServer((req, res) => {
//  if (req.method === "GET" && req.url === "/") {
//    res.writeHead(200, { "Content-Type": "text/html" });
//    res.write("Hello World");
//    res.end();
//  }
//});

const postHTML = `<html><head><title>Post Example</title></head><body>
  <form method='post' action="/submit">
  <label for="name">Name: </label>
  <input type="text" name="name" id="name"><br />
  <label for="email">Email: </label>
  <input type="text" name="email" id="email"><br />
  <label for="Comments">Comments:</label>
  <input type="text" name="Comments" id="Comments><br/>"
  <label for="Newsletter">NewsLetter</label>
  <input type="checkbox" name="Newsletter" id="Newsletter"><br/>
  <input type='submit'>
  </form></body></html>`;

const server = http.createServer((req, res) => {
  let body = "";

  if (req.url === "/") {
    res.writeHead(200);
    res.end("Hello World");
  } else if (req.url === "/form") {
    console.log("Hello Form");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(postHTML);
  } else if (req.url === "/submit") {
    console.log(req.body);
    res.writeHead(200);
    res.end("Submit submitted");
  }
  //  req.on("data", (chunk) => {
  //    body += chunk;
  //    console.log("on data: " + body);
  //  });
  //  req.on("end", () => {
  //    console.log("on end: " + body);
  //    res.writeHead(200);
  //    res.end(postHTML);
  //  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
