# React Testing Library

React Testing Library is an evolution, arguably an improvement on the old `Enzyme` library which was highly popular. It has been the main competitor for `Enzyme` for a while but in 2020 has become far more popular since `Enzyme` was abandoned by `airbnb` and switched to being maintained by an individual, this is due to the lack of support for `React 18` with the `Unofficial Enzyme Adapter`. As such, I would recommend steering clear of `Enzyme` focusing more so on `React Testing Library`, both fulfill the same function, however, RTL retains support for the latest versions of react. RTL does not rely on Reacts internals for it's use and therefore does not require an adapter. If you absolutely MUST use `Enzyme` (for a legacy project etc...) we will cover it's use in a separate chapter.

RTL has specific responsibilities in that it takes care our rendering our virtual DOM, it allows us to interact with this virtual DOM, even searching the virtual DOM for components. RTL does however require a Test Runner, this is where [Jest](../chapters/3_jest.md) comes in.

Contrary to it's name, RTL is actually not just a library. RTL also enforces a philosophy upon it's user. As such it is highly opinionated in how it wants us to test our code and consists of 3 key tenets:

1. Test your app the way a user uses it
2. Don't test internal implementation
3. Find elements by accessibility markers not IDs

The rationale for this is such that; [1] if we test our app the way our user uses it we know our app works within the bounds of our use case. [2] we don't care how the code is implemented, we care about the behaviour, we care that our functionality adheres to our specification the technical details of how the problem was solved does not matter. [3] by finding elements on the page by their accessibility markers we instantly know that our application is accessible to screen-readers and other disability tools, this is killing two birds with one stone as we are not only testing our application functions how we expect, but also that our application is accessible to the end-user.

## The Role of RTL

RTL provides us with a virtual DOM for running tests. This allows for us to interact with elements and check that the virtual DOM is responding and updating in the expected manner. We do however, need a separate test runner.

## First RTL Example

When we first create a react application using create-react-app we get an initial test file which looks something like this:

<pre>
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(< App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
</pre>

Even if you are familiar with unit testing there are a few surprises here. First of all, `jest` is very different to other testing libraries you may be familiar with coming from classical languages like `Java` and `PHP` using `PHPUnit` or `JUnit` as these tests are made to test class based components. JS is not a class based language but a prototypal language, most things we want to test in JS are themselves functions, not necessarily functions of a particular object either since we mostly focus on functional based approaches when writing JS (more on that in the `jest` chapter). The second thing you will notice is the imports atop of the page. We begin with an import of `render` and `screen` from RTL itself, what are these? why do we import them? how do we even know to import them?

First of all we will always need the `render` method as this is the function responsible for creating our `virtual DOM`. As we discussed earlier this is a necessary step in order to give us a DOM to play with, to render components to, to manipulate, and to verify against. Secondly, we need a means of accessing the virtual DOM after it has been rendered, as such, we import the `screen` global object, this gives us the means of accessing our virtual DOM via a range of accessor methods, we can see the use of this when we call `getByText` on the screen object passing it a `regex` pattern. This means that our `linkElement` will actually contain a reference to our element from the virtual DOM matching the regex pattern, in memory. Lastly we have an `assertion`, this is what `asserts` the value that we are expecting, generally, a test will pass by default, this means that an empty test is actually a successful test, our test fails only when an error occurs, we can check this by manually writing a test containing only an error.

<code>

test('fails due to error thrown', () => {
    throw new Error('Failure!');
});

test('passes due to empty', () => {
    // Nothing here!
});

</code>


## Philosophy

RTL provides us with the tools to render, interact, and test our expectations using a virtual DOM. The advantage of this is we can test our code without the need for using a browser. The philosophy imposed by RTL is the fact it encourages the use of `functional` tests. This means RTL wants us to test the behaviour of our application, not necessarily our code. A common error you will see in applications is the naming of `functional` tests as `*.unit.test`. Personally, I think this to be very bad practice as I want the file to tell me exactly what test it is, I want to know the intent of the test, should it be testing functionality? or code? as such, it is important that when we write our tests we write them knowing what we are testing and try to only name actual `unit` tests as `*.unit.test`, for others I tend to name them after the base component whose behaviour the functional test is testing.