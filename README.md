[![Honeybadger's Serverless Quickstart](https://honeybadger-static.s3.amazonaws.com/github/serverless-quickstart.png)](https://www.honeybadger.io/for/node/?utm_source=github&utm_medium=readme&utm_campaign=serverless&utm_content=cover-image)

# Honeybadger's Serverless Quickstart
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![Build Status](https://travis-ci.org/honeybadger-io/serverless-quickstart.svg?branch=master)](https://travis-ci.org/honeybadger-io/serverless-quickstart)
[![License](https://img.shields.io/github/license/honeybadger-io/serverless-quickstart.svg)](LICENSE)

This is a blank serverless project that gives you:

- A directory structure
- Testing via [Jest](https://jestjs.io/)
- Better dev/prod separation
- A serverless-friendly [ESLint](https://eslint.org/) config
- Honeybadger reporting (duh!)

We use this to quickly spin up new Serverless projects at [Honeybadger](https://www.honeybadger.io/for/node/?utm_source=github&utm_medium=readme&utm_campaign=serverless&utm_content=Honeybadger).

## Directory Structure

The Serverless framework provides no directory struction out of the box.
This project adopts one that seems to be fairly common:

```
.
├── functions             // `functions` dir holds your lambda fns. One file per fn.
│   └── greet.js
├── lib                   // `lib` contains most of your code, broken into modules
│   └── hello.js
├── tests                 // Tests go in `test` and are named like `foo.test.js`
│   └── hello.test.js
├── serverless.yml        // Project configuration
├── node_modules          // Non-dev dependencies are automatically included by Serverless
├── README.md
├── package.json
└── package-lock.lock
```

## Local Installation

To get the project running locally, make sure you have node 8.x and serverless installed globally.

```
# Install the serverless package globally:
npm install -g serverless

cd serverless-quickstart
npm install
```

## Deploying

In Rails you run your app in the "development" or "production" environments.
With the Serverless framework, you deploy to either the "dev" or "production" stages.

This quickstart provides an easy way to use different AWS accounts for different stages, as recommended by the Serverless team.
It does so by using a different AWS profile for each stage.
Profiles are stored in `~/.aws/credentials`.

- **default** - Your default AWS profile should point to HB production.
- **honeybadger-dev** - This profile is used for dev. Ideally, it should point to your personal AWS acct.

To deploy to development:

```
sls deploy
```

To deploy to production:

```
sls deploy --stage production
```

If you're done, and want to remove from dev:

```
sls remove
```

## Running the 'greet' function

This quickstart comes with a working example function that takes a name like "Bob" and returns "Hello, Bob".

To get it running:

1. Set up your AWS profiles as described above
2. From your project directory, run `sls deploy`
3. Log into the [AWS console](https://console.aws.amazon.com/lambda/home) and pull up the lambda function
4. Create a new test event containing `{ "name": "Bob" }`
5. Click "Test" to run the test.
6. View the output.

The code in `functions/greet.js` gives a pretty good overview of how data comes in and goes out of the lambda fn.

## Viewing Logs

When you `console.log` something in your code, it gets written to a cloudwatch log stream.
An easy way to view this stream is to do:

```
sls logs --tail --function <myfuncname>
```

For production, it's:

```
sls logs --tail --function <myfuncname> --stage production
```

## Honeybadger Reporting

To report errors to [Honeybadger](https://www.honeybadger.io/for/node/?utm_source=github&utm_medium=readme&utm_campaign=serverless&utm_content=Honeybadger), add the following environment variable to the "Environment variables" section in the Lambda dashboard for your function:

```
HONEYBADGER_API_KEY=[project API key]
```

![AWS Lambda Dashboard](https://s3.amazonaws.com/honeybadger-static/github/aws-lambda-env-vars.png)

## Local Tests

Tests use the [Jest](https://jestjs.io/) framework.
They run locally, and should mock all AWS calls so that they can run offline.

Jest considers any file with a name like `foo.test.js` to be a test.
While test files can technically be in any subdirectory, here we place them in `test/` for sanity.

To run tests whenever files change:

```
npm test -- --watch
```

Leave out the `--watch` option to run tests once.

## Linting

This project contains configuration for [ESLint](https://eslint.org/), but it doesn't automatically run the linter.

I recommend that you set up your editor to automaticaly run ESLint on save.
In Vim, the [syntastic](https://github.com/vim-syntastic/syntastic) plugin does this.
For Neovim, [neomake](https://github.com/neomake/neomake) is a good option.
