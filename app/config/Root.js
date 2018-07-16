import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store from './store';
import FormLogin from '../components/auth/FormLogin';
import FormRegistration from '../components/auth/FormRegistration';
import App from '../components/App/App';

const history = createBrowserHistory();

const Root = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Switch>
            <Route path="/registration" component={FormRegistration} />
            <Route path="/login" component={FormLogin} />
            <Route path="/" component={App} />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  );
};

export default Root;

