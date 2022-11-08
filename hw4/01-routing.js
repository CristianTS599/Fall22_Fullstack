const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

const routes = [
  'welcome',
  'redirect',
  'redirected',
  'cache',
  'cookie',
  'other',
];

let getRoutes = () => {
  let result = '';

  routes.forEach(
    (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
  );

  return result;
};

app.get('/', (req, res) => {
  let routeResults = getRoutes();

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(`<h1>Exercise 04</h1>`);
  res.write(`<ul> ${routeResults} </ul>`);
  res.end();
});

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format
app.get('/welcome', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h2>Hello, This is the welcome page.</h2>');
  res.end();
});

// Add your code here

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice
app.get('/redirect', (req, res) => {
  res.writeHead(302, { Location: 'http://localhost:5001/redirected' });
  res.end();
});

app.get('/redirected', (req, res) => {
  res.writeHead(302, { 'Content-Type': 'text/html' });
  res.write('<h2>Redirect, has been redirected.</h2>');
  res.end();
});

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

app.get('/cache', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Cache-Control': 'max-age=86400',
  });
  res.write('<h2>this resource was cached</h2>');
  res.end();
});

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie
app.get('/cookie', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Set-Cookie': 'hello=world',
  });
  res.write('<h2>Cookies... yummm</h2>');
  res.end();
});

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format
app.get('*', (req, res) => {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.write(`<h2>404 Error: \"${req.url}\" is invalid or not found.</h2>`);
  res.write(
    "<div>Navigatge <a href='http://localhost:5001/'>here</a> and try again.</div>"
  );
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
