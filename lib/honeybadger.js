const hb = require('@honeybadger-io/js');

hb.configure({
  apiKey: process.env.HONEYBADGER_API_KEY
});

module.exports = { honeybadger: hb.lambdaHandler };
