import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import MainPage from '../MainPage';

const App = () => {
  const token = localStorage.getItem('token.id');
  const user = localStorage.getItem('user.id');
  const startPage = (token && user && user !== 'undefined' && token !== 'undefined') ? <Route path="/" component={MainPage} /> : <Redirect to="/login" />;
  return (
    <div>
      {startPage}
    </div>
  );
};

export default App;
