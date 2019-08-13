import React from 'react';
import ReactDOM from 'react-dom';
import UniversalRouter from 'universal-router';
import * as history from 'history';
import App from './App';
import routes from './routes';
import * as serviceWorker from './serviceWorker';

export const browserHistory = history.createBrowserHistory();

const router = new UniversalRouter(routes);

let currentLocation = browserHistory.location;

const onLocationChange = async (location) => {

  currentLocation = location;

  const context = {
    pathname: location.pathname,
    query: {},
  };

  if (currentLocation.key !== location.key) {
    return;
  }

  const component = await router.resolve(context);

  ReactDOM.render(<App context={context}>{component}</App>, document.getElementById('root'));
}

browserHistory.listen(onLocationChange);
onLocationChange(currentLocation);


// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
