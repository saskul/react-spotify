import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import saga from './sagas';
import App from './App';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({
  duration: true,
  timestamp: true
});

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const store = createStore(
   reducer,
   composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
      logger
     )
   )
);

sagaMiddleware.run(saga);

ReactDOM.render(
   <Provider store={store}>
     <App />
   </Provider>,
document.getElementById('root'),
);
