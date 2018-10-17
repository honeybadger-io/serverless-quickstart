const subject = require('../lib/hello');

test('Says hello', () => {
  // This test will fail
  expect(subject.hello('Bob')).toEqual('Hello, Bob');
});
