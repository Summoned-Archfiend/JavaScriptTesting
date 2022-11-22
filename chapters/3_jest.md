# Jest and Jest-DOM

Jest is a testing framework yes, but more specifically it is what we call a test runner. Jest has the primary responsibilities of:

1. Finding tests
2. Running tests

Jest is used in conjunction with other libraries such as RTL in order to run our tests, it is not the only library which does such but is the one recommended by RTL and is one of the most popular, and easiest to use. When running Jest with RTL as part of  create-react-app we also get Jest-DOM included.

Jest-DOM uses the script `src/setupTests.js` to make DOM based matchers available to us within our tests. This script is imported before every test we write. DOM based matchers are those like the `toBeInTheDocument`, these are matchers very specific to the DOM, this does not include the more generalistic matchers like `toBe` or `toHaveLength`, basically, this script sets up any of the matchers which are applicable to interacting with our virtual DOM. We can run `jest` in react by running `npm jest`, `create-react-app` actually sets this up in our `npm scripts` automatically, when we run this command we are actually running `react-scripts test` which is a utility that comes from `create-react-app`. This runs `jest` in `watch` mode, an interactive mode which allows us to run our tests, but will also re-run our tests when any changes are detected, only re-running tests which have changed.

Jest detects our changes via the `global` test method. This method takes an argument of a string description, this is how `jest` knows which test is running, and a test `function`. This `function` tells us whether our test succeeds or fails, it does so by checking if any error is thrown whilst the test function is running. If an error is thrown the test fails.

___

<div align="right">

[<< prev](./2_RTL.md) | [next >>](./4_assertion.md)