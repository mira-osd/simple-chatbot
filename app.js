const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const http = require('http');
let server = http.createServer(app);

const port = process.env.PORT || 5000;

// Middleware Setup 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

const chatRoutes = require('./routes/chat');
app.use('/', chatRoutes);

app.use(express.static(path.join(__dirname, 'client/build')));

// route not-found => could be a React route => render the SPA
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function (err) {
    if (err) {
      next(err)
    }
  })
});


  // Server Started
  server.listen(port, () => {
    console.log(`Chatbot listening on http://localhost:${port}`);
  });

module.exports = app;