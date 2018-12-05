const compression = require('compression');
const history = require('connect-history-api-fallback');
const express = require('express');
const app = express();

const frontend = require('./frontend');
const backend = require('./backend');

const {
  apiEndpoint,
  credentials,
} = require('../environment');

if (credentials) {
  app.use((req, res, next) => {
    if (req.secure) return next();
    res.redirect(301, `https://${req.hostname}${req.url}`);
  });
}
app.use((req, res, next) => {
  if (req.hostname !== 'algo-visualizer.jasonpark.me') return next();
  res.redirect(301, 'http://algorithm-visualizer.org/');
});
app.use(apiEndpoint, backend);
app.use(history());
app.use(compression());
app.use(frontend);

module.exports = app;
