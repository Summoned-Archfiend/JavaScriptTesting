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

___

<div align="right">

[<< prev](./3_jest.md) | [next >>](../README.md)