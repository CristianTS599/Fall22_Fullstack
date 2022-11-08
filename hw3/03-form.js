const http = require("http");
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

const postHTML = `<html><head><title>Post Example</title></head><body>
  <form method='post' action="/submit" style="display:grid; width:400px">
  <label for="Name">Name: </label>
  <input type="text" name="Name" id="Name"><br />
  <label for="Email">Email: </label>
  <input type="text" name="Email" id="Email"><br />
  <label for="Comments">Comments:</label>
  <textarea id="Comments" name="Comments"></textarea><br />
  <label for="Newsletter">NewsLetter</label>
  <input type="checkbox" name="Newsletter" id="Newsletter"><br/>
  <input type='submit'>
  </form></body></html>`;

const newsletter = "Yes, sign me up for some news!";
const noNewsletter = "No news for me.";

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
    console.log("Submit submitted");
  }
  req.on("data", (chunk) => {
    body += chunk;
    body = decodeURI(body);
    let keyVals = body.split("&");
    let submitResponse = "";

    let wantNews = body.includes("Newsletter");

    keyVals.forEach((key) => {
      if (!key.includes("Newsletter")) {
        submitResponse = submitResponse.concat(
          "",
          `<div>${key.split("=")[0]}: ${
            key.indexOf("%40") > 1
              ? key.split("=")[1].replace("%40", "@")
              : key.split("=")[1]
          }</div>`
        );
      }
    });

    submitResponse = submitResponse.concat(
      "",
      `<div>NewsLetter: ${wantNews ? newsletter : noNewsletter}</div>`
    );
    res.writeHead(200, { "Content-body": "text/html" });
    res.end(submitResponse);
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
