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

___

<div align="right">

[<< prev](./3_jest.md) | [next >>](../README.md)