# Jest and Jest-DOM

Jest is a testing framework yes, but more specifically it is what we call a test runner. Jest has the primary responsibilities of:

1. Finding tests
2. Running tests

Jest is used in conjunction with other libraries such as RTL in order to run our tests, it is not the only library which does such but is the one recommended by RTL and is one of the most popular, and easiest to use. When running Jest with RTL as part of  create-react-app we also get Jest-DOM included.

Jest-DOM uses the script `src/setupTests.js` to make DOM based matchers available to us within our tests. This script is imported before every test we write. DOM based matchers are those like the `toBeInTheDocument`, these are matchers very specific to the DOM, this does not include the more generalistic matchers like `toBe` or `toHaveLength`, basically, this script sets up any of the matchers which are applicable to interacting with our virtual DOM. We can run `jest` in react by running `npm jest`, `create-react-app` actually sets this up in our `npm scripts` automatically, when we run this command we are actually running `react-scripts test` which is a utility that comes from `create-react-app`. This runs `jest` in `watch` mode, an interactive mode which allows us to run our tests, but will also re-run our tests when any changes are detected, only re-running tests which have changed.

Jest detects our changes via the `global` test method. This method takes an argument of a string description, this is how `jest` knows which test is running, and a test `function`. This `function` tells us whether our test succeeds or fails, it does so by checking if any error is thrown whilst the test function is running. If an error is thrown the test fails.

## How Testing Frameworks Work

Most mid-level developers know how to use a testing framework like Jest, however, if asked how they work many would know very little about what happens under the hood. Testing is actually rather simplistic in reality, we run our code as we would normally and assess the result. If the result equates to the expected result, our test should pass, else, it should fail. It does this by throwing an error if our result does not match our expectations. If we were to write a very simple test without a framework it may look something like this:

<br />

<pre>
const sum = (a, b) => a - b

const answer = sum(1, 2);
const expected = 3;

if (answer !== expected) {
  throw new Error(`Result: ${answer} is not equal to ${expected}!`);
}
</pre>

Here we have a sum function. We expect it to sum the results but unbeknownst to the original developer there is a bug! they have accidentally used the `-` operator, thus when we check our answer against the expected result our error is thrown. This works, but it isn't very reusable, nor is it very nice to look at. We would need to improve this further if we were to use it as an actual test library, fortunately to attain behaviour similar to Jest doesn't require much expansion, we can utilise higher order functions and JS' unique composition ability to return functions as object members in order to attain an expect function which itself returns an object with a `toBe` function that asserts our value.

<br />

<pre>
const expect = actual => {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}!`)
      };
    },
  };
};

const result = sum(1, 3);
const expected = 4;

expect(result).toBe(expected);
</pre>

Here the `expect` function returns an `object` which has a property `toBe` of which itself is a `function` that takes an `expected` as an argument. We call this on the result passing our expectant value, as such, the if statement then checks for equality of the `actual` and the `expected` values. Notice how we only error if they do not match, in any other case we do absolutely nothing, in other words, we only care about failure anything else we can ignore as a success. In reality, testing libraries will usually give you some kind of success confirmation, usually with a nice green text counting all of your passing tests, but this example suffices for drilling home the function of tests.

Frameworks like `Jest` gives us much more information on failing tests, are far more descriptive, and more powerful in terms of the utilities they give us for interacting with tests and making assertions. We can use `test` blocks to describe our tests and `describe` blocks to group related tests together (these can even be nested to break down tests into further groupings), `it` is an alias for `test`, pick one and stick with it for consistency but know there is no feasible difference between the two, some argue `it` to be more descriptive as it reads better, others argue that `test` is better as it describes what the process is, it is mostly down to either personal preference on your own projects or the standard set by the codebase elsewhere.

<br />

<pre>
describe('Several related tests', () => {
    test('Should execute a single test', () => { ... })
    it('Should execute a single test', () => { ... })
})
</pre>

<br />

We can actually use this knowledge to improve our own "framework" somewhat. Notice how everything here is actually a function, everything we do in jest is simply calling a function and passing in some values, whether that value be a callback full of our assertions or a title, that is pretty much all we do in Jest.  As such we can begin by defining a `test` function. This function should take two arguments:

1. title - The "title" (or description) of the test to run
2. callback - The callback containing our assertions

All this test function will actually do is run our `callback` function, but, we need to make sure we catch any errors. We know that our `expect` function works by comparing our `actual` and `expected`, throwing an error if they do not match. Thus, we need to handle this error with a `try/catch`. In doing so we allow execution to continue even if one of our tests fail, this means we can run all of our tests and print a nice output to the console describing which tests failed, and which passed.

<br />

<pre>
const expect = actual => {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}!`)
      };
    },
  };
};

const test = (title, callback) => {
  try {
    callback();
    console.log(`✓ ${title}`)
  } catch(error) {
    console.error(`x ${title}`)
    console.error(error);
  };
};

test('Sums the arguments together', () => {
  const { sum } = require('./calc');

  const result = sum(3, 7);
  const expected = 10;

  expect(result).toBe(expected);
});

test('Subtracts the arguments from one another', () => {
  const { subtract } = require('./calc');

  const result = subtract(7, 3);
  const expected = 4;

  expect(result).toBe(expected);
});
</pre>

<br />

Great! so we have two of our necessary functions to test our code and we get nice console output whether our test is successful or fails! notice how we can run multiple tests, and each of our tests are isolated and contained from one another. If you have read through [UnderStandingNode](https://github.com/Summoned-Archfiend/Understanding-Node) you have likely spotted exactly how this is achieved. For those who haven't this is achieved through the use of functions. Within each of our functions is a new execution context created upon invocation, each of these contexts come with their own `local` memory, this means nothing outside of our function has access to the internals of the function until it is returned from the `local` memory into the global variable environment. Of course `Jest` is far more complex than this example, however, the takeaway here is the basic functionality of a testing framework. In `Jest` we only receive relevant information rather than the huge stack trace we receive from the code above. A good error message is the key to a great testing library, we need messages that tell us exactly where our bug is so that we can identify and fix them quickly.

___

<div align="right">

[<< prev](./2_RTL.md) | [next >>](./4_assertion.md)