import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import reducerAuth from '../redux/reducers/auth';
import reducerTasks from '../redux/reducers/tasks';
import reducerBoards from '../redux/reducers/boards';

const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  reducerAuth,
  reducerTasks,
  reducerBoards,
});

export default createStore(
  connectRouter(history)(reducer),
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(history))),
);
