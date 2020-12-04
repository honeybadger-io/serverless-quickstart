const { honeybadger } = require('../lib/honeybadger');

const handler = async(event, context) => {
  // Log the event data. We convert it to JSON so that we can see all levels of nesting.
  console.log('Handler invoked. Event: ', JSON.stringify(event, null, 2));

  foo / 0

}

module.exports = { handler: honeybadger(handler) };
