const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 5001;

// Add your code here

// Use the express-session module
app.use(
  session({
    store: new session.MemoryStore(),
    secret: 'secret to sign the cookie',
    resave: false,
    saveUninitialized: false,
    cookie: { maxage: 86400 },
  })
);

app.get('/', (req, res) => {
  // Add your code here
  res.status(200);
  res.set({ 'Content-Type': 'text/html' });
  if (req.session.example === undefined) {
    req.session.example = [];
    req.session.example.push(req.url);
    res.send('<h2>Hello, New User</h2>');
  } else {
    req.session.example.push(req.url);
    let result = `<h3>Currently At ${req.url}</h3>`;
    result += '<h5>Your travel History:</h5>';
    req.session.example.forEach((item) => {
      result += `<li>${item}</li>`;
    });
    res.send(result);
  }
});
app.get('*', (req, res) => {
  // Add your code here
  res.status(200);
  res.set({ 'Content-Type': 'text/html' });
  if (req.session.example === undefined) {
    req.session.example = [];
    req.session.example.push(req.url);
    res.send('<h2>Hello, New User</h2>');
  } else {
    req.session.example.push(req.url);
    let result = `<h3>Currently At ${req.url}</h3>`;
    result += '<h5>Your travel History:</h5>';
    req.session.example.forEach((item) => {
      result += `<li>${item}</li>`;
    });
    res.send(result);
  }
});

//const GenerateHtml = (req, res, url) => {
//  if (req.session.history === undefined) {
//    req.session.history = [];
//    req.session.history.push(url);
//    return `<h2>Hello, New User. Currently at ${url}</h2>`;
//  } else {
//    let result = `Currently At: ${url} <br/><br/>`;
//    result += '<ul>';

//    req.session.array.forEach((element) => {
//      result += `<li>${element}</li>`;
//    });
//    result += '</ul>';
//    req.session.history.push(url);
//    return result;
//  }
//};

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
