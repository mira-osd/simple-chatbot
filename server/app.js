const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware Setup 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

const chatRoutes = require('./routes/chat');
app.use('/', chatRoutes);
  
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

  // Server Started
  app.listen(5000, () => {
    console.log(`Chatbot listening on http://localhost:${5000}`);
  });

module.exports = app;