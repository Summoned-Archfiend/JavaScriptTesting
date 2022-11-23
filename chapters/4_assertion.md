# Assertions

Assertions are an essential part of testing. Assertions are the deciding factor of whether a test passes or fails. Usually a test will pass by default, if it is empty for instance, unless an error is thrown in which case the test fails.

In `Jest` assertions always begin with the `expect` method, we pass an argument to this function which refers to the `subject` of the assertion. This is the element to be examined to determine whether or not it will meet our expected result. Lastly we have a matcher, this is the assertion type, for instance `toBeInTheDocument` is a matcher on our default RTL example.

<pre>
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(< App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
</pre>

Another example of a matcher would be the more generic `toBe` method which also takes an argument of a comparator, this would be the object or value to compare the expectant result to.

So, how exactly do assertions work? assertions basically check our matcher. If our result matches our expectation the test passes, however, if it does not then an error is thrown, our `Jest` test function then detects this error and causes our test to fail.

In `Jest` we have multiple assertions, all of which can be found on the docs. Most of these are self explanatory so we will not go into detail. One in particular to be aware of is the difference between `toMatchObject` and `objectContaining`, the first being an assertion which will still pass even if an object contains some, but not all, of the properties on the `expected` object. This means we are not checking for an exact match with this assertion, but a match of object structure rather than the actual values being present, whilst the latter (objectContaining) can be used to match on specific object properties and values and will fail if the objects are not exact matches.

## Symmetric and Asymmetric

In Jest we have two classes ot matchers, `symmetrical` and `asymmetrical`. `Symmetrical` matchers are matchers which assert data in it's entirety, they are also known as strict comparison matchers:

<pre>
expect(obj).toEqual({ id: 123 })
</pre>

`toEqual` is a symmetrical matcher because the `actual` object must equal the `expected` object exactly. It it does not have the `id` property, or additional properties exist which are not expected, the assertion will fail.

Alternatively, `asymmetric` matchers are, as you probably guessed, a matcher which matches on partials. The below assertion asserts the same as above but using the `asymmetric` matcher `objectContaining`:

<pre>
expect(myObject).toEqual(
  expect.objectContaining({
    id: 123,
  })
)
</pre>

We can even use these `asymmetrical` matchers to create a schema in which we then assert specific properties:

<pre>
test('Example test', () => {
  const birthday = {
    day: 17,
    month: 05,
    year: 1995,
    meta: { display: 'May 17th, 1995'},
  };

  const schema = {
    day: expect.any(Number),
    month: expect.any(Number),
    year: expect.any(Number),
    meta: { display: expect.stringContaining('1995') },
  };

  expect(birthday).toEqual(schema);
});
</pre>

This can be useful if we don't care about what the data is specifically, we just want to assert the data returned is of a particular type. We can expand this further by extending `Jest` to suite our needs using `custom` matchers. We do so by adding a jest configuration file first we must add a custom setup file:

<pre>
export default {
  // Let Jest know that there's an additional setup
  // before the tests are run (i.e. matcher extensions).
  setupFilesAfterEnv: ['./jest.setup.ts'],
}
</pre>

then we can extend the framework just like we can with any other function or obejct in JS:

<pre>
// jest.setup.ts
expect.extend({
  toBeWithinRange(actual, min, max) {
    if (typeof actual !== 'number') {
      throw new Error('Actual value must be a number')
    }
    const pass = actual >= min && actual <= max
  },
})
</pre>

Custom matchers must return an object with the a boolean property `pass` and a message property evaluating to a `string`, note if you are using `TypeScript` you will also need to let `TypeScript` know that you have extended the library.

<pre>
// jest.setup.ts
expect.extend({
  toBeWithinRange(actual, min, max) {
    if (typeof actual !== 'number') {
      throw new Error('Actual value must be a number')
    }
    const pass = actual >= min && actual <= max
    return {
      pass,
      message: pass
        ? () => `expected ${actual} not to be within range (${min}..${max})`
        : () => `expected ${actual} to be within range (${min}..${max})`,
    }
  },
});
</pre>

___

<div align="right">

[<< prev](./3_jest.md) | [next >>](../README.md)