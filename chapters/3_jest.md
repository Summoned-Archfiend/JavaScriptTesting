# Jest and Jest-DOM

Jest is a testing framework yes, but more specifically it is what we call a test runner. Jest has the primary responsibilities of:

1. Finding tests
2. Running tests

Jest is used in conjunction with other libraries such as RTL in order to run our tests, it is not the only library which does such but is the one recommended by RTL and is one of the most popular, and easiest to use. When running Jest with RTL as part of  create-react-app we also get Jest-DOM included.

Jest-DOM uses the script `src/setupTests.js` to make DOM based matchers available to us within our tests. This script is imported before every test we write. DOM based matchers are those like the `toBeInTheDocument`, these are matchers very specific to the DOM, this does not include the more generalistic matchers like `toBe` or `toHaveLength`, basically, this script sets up any of the matchers which are applicable to interacting with our virtual DOM.