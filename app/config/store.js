import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import reducerAuth from '../redux/reducers/auth';
import reducerMain from '../redux/reducers/main';

const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  reducerAuth,
  reducerMain,
});

export default createStore(
  connectRouter(history)(reducer),
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(history))),
);
