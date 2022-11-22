# React Testing Library

React Testing Library is an evolution, arguably an improvement on the old `Enzyme` library which was highly popular. It has been the main competitor for `Enzyme` for a while but in 2020 has become far more popular since `Enzyme` was abandoned by `airbnb` and switched to being maintained by an individual, this is due to the lack of support for `React 18` with the `Unofficial Enzyme Adapter`. As such, I would recommend steering clear of `Enzyme` focusing more so on `React Testing Library`, both fulfill the same function, however, RTL retains support for the latest versions of react. RTL does not rely on Reacts internals for it's use and therefore does not require an adapter. If you absolutely MUST use `Enzyme` (for a legacy project etc...) we will cover it's use in a separate chapter.

Contrary to the name, RTL is actually not just a library but also a philosophy, it is highly opinionated in how it wants us to test our code and consists of x key tenets:

1. Test your app the way a user uses it
2. Don't test internal implementation
3. Find elements by accessibility markers not IDs

The rationale for this is that [1] if we test our app the way our user uses it we know our app works within the bounds of our use case. [2] we don't care how the code is implemented, we care about the behaviour, we care that our functionality adheres to our specification the technical details of how the problem was solved does not matter. [3] by finding elements on the page by their accessibility markers we instantly know that our application is accessible to screen-readers and other disability tools, this is killing two birds with one stone as we are not only testing our application functions how we expect, but also that our application is accessible to the end-user.

## The Role of RTL

RTL provides us with a virtual DOM for running tests. This allows for us to interact with elements and check that the virtual DOM is responding and updating in the expected manner.
