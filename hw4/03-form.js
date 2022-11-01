const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5001;

// Use middleware static() to serve all static files in the given folder
app.use(express.static('public'));

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200);
  res.set({ 'Content-Type': 'text/Html' });
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// POST request
app.post('/submit', (req, res) => {
  res.status(200);
  res.set({ 'Content-Type': 'text/html' });

  let result = '';
  let wantNews = false;
  Object.keys(req.body).forEach((key) => {
    if (key !== 'Newsletter') {
      result += `<h4>${key}: ${req.body[key]}</h4>`;
    } else if (key === 'Newsletter') {
      wantNews = true;
      result += `<h4>Newsletter: Yes! Sign me up.</h4>`;
    }
  });

  if (!wantNews) {
    result += `<h4>Newsletter: No Thanks!</h4>`;
  }

  res.send(result);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
