import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import MainPage from '../MainPage';

const App = (props) => {
  const token = localStorage.getItem('token.id');
  const user = localStorage.getItem('user.id');
  const str = props.location.pathname;
  let startPage = '';
  if (str.includes('share')) {
    startPage = <Route path="/" component={MainPage} />;
    const token = props.location.search.substring(19);
    if (!localStorage.getItem('token.id')) {
      localStorage['token.id'] = token;
    }
    localStorage['token.id'] = token;
  } else {
    startPage = (token && user && user !== 'undefined' && token !== 'undefined') ? <Route path="/" component={MainPage} /> : <Redirect to="/login" />;
  }
  return (
    <div>
      {startPage}
    </div>
  );
};

export default App;
