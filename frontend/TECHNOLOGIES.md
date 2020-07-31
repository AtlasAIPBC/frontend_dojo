# Technologies

* React

React is a single page app framework.  There are two core ideas: JSX and Components.

JSX allows you to write something between javascript and HTML that gets turned into HTML.

Components are the building blocks of a React application.
Components have a function called render which allows them to define how they are draw on the screen (using JSX).
All React applications start from a single component (typically called App.jsx).
Each component will create children components and add them in the render function.

Components manage two types of state: props and state.
props are passed in from the parent component when rendered, state is defined inside the component (and may be passed to children).
In React, all state updates happen through events, using the setState function.
Components call setState rather than changhing their state directly.
The React framework will then update the state on its own and ask the component to re-render itself.


* React-Redux

Redux is a stand alone technology for managing state in client side javascript apps.
React-Redux is the Redux plugin for React.

Redux allows you to separate the state of your application from the view/rendering logic.
It then maintains a store of the application state and provides getters and setters.

React-Redux provides a connect function that allows a component to list to state in the store (and be re-rendered when that state changes).
React-Redux's connection function also provides components with the ability to request that state be changed.


* Rematch

This is a framework for Redux that abstracts away much of the challenge of defining actions in redux.


* Babel

Babel allows new javascript language specifications to be transpiled to older versions for better browser support.

* Firebase

Handles authentication but not authorization.

Disabling signup seems difficult.

* Axios

Simple JS library to make HTTP requests

* Uber Map GL

Renders the map onto the screen using WebGL.  See documentation links down below.

* Google Analytics and Google Tag Manager

?

## Tutorials

* Redux
* * https://redux.js.org/introduction/getting-started
* * * https://redux.js.org/introduction/motivation
* * * https://redux.js.org/introduction/core-concepts Required Reading
* * * https://redux.js.org/introduction/three-principles Required Reading

* React-Redux
* * https://react-redux.js.org/introduction/quick-start Required Reading
* * https://react-redux.js.org/api/connect Understand the connect function

* Rematch
* * https://rematch.gitbooks.io/rematch/#getting-started Required Reading
* * https://rematch.gitbooks.io/rematch/docs/purpose.html Required Reading

* React
* * React tutorials tend to be long
* * https://reactjs.org/docs/getting-started.html
* * https://medium.freecodecamp.org/all-the-fundamental-react-js-concepts-jammed-into-this-single-medium-article-c83f9b53eac2

* Babel
* * https://babeljs.io/

* Axios
* * https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index

* Uber Map GL
* * https://github.com/uber/react-map-gl/tree/master/docs
* * https://github.com/uber/react-map-gl

* [AntDesign](https://ant.design)

* Google Analytics and Google Tag Manager
* * [Cross Domain Tracking](https://www.bounteous.com/insights/2015/06/16/cross-domain-tracking-with-google-tag-manager/?ns=l) and [the offical doc](https://support.google.com/tagmanager/answer/6164469?hl=en)
* * [Same tag across multiple domains](https://flintanalytics.com/track-multiple-websites-with-one-google-tag-manager-container/)
* * [Tag manager vs Analytics Medium Post](https://medium.com/@thebigpicturebiz/google-tag-manager-vs-google-analytics-143fb1554eb1)
* * [Analytics with Tag Manager](https://support.google.com/tagmanager/answer/6107124?hl=en)

