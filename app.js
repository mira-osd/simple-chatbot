const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const port = process.env.PORT || 5000;

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
  app.listen(port, () => {
    console.log(`Chatbot listening on http://localhost:${port}`);
  });

module.exports = app;