const { hello } = require('../lib/hello');
const { honeybadger } = require('../lib/honeybadger');

function handler(event, context, callback) {
  // Log the event data. We convert it to JSON so that we can see all levels of nesting.
  console.log('Handler invoked. Event: ', JSON.stringify(event, null, 2));

  // The format is `callback(<error message or null>, <success message>)`
  callback(event.name ? null : 'no name', hello(event.name));

  // Alternatively, you can return a promise instead of using the callback
  //
  // return new Promise(
  //   (resolve, reject) =>
  //     event.name ? resolve(hello(event.name)) : reject('no name'),
  // );
}

module.exports = { handler: honeybadger(handler) };
