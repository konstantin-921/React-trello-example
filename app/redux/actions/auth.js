import axios from 'axios';
import help from '../../services/helpers/helperLogin';
import api from '../../services/api';

const localhost = 'http://localhost:3000';

export const redirectLogin = (data) => {
  return {
    type: 'REDIRECT_LOGIN',
    data,
  };
};

export const addUserMessageAuth = (data) => {
  return {
    type: 'ADD_USER_MESSAGE_AUTH',
    data,
  };
};

export const hideUserMessage = () => {
  return {
    type: 'HIDE_USER_MESSAGE',
  };
};

export function logining(username, userpass) {
  const userData = {
    username,
    userpass,
  };
  const url = new URL(`${localhost}/auth/login`);
  url.search = new URLSearchParams(userData);
  return (dispatch) => {
    return axios.get(url)
      .then(help.checkStatus)
      .then(help.saveToken)
      .then(() => {
        return api.post(`${localhost}/auth/secret`)
          .then(help.checkStatus)
          .then(() => dispatch(redirectLogin(true)))
          .catch((error) => {
            console.log(error.response.data.message);
          });
      })
      .catch((error) => {
        dispatch(addUserMessageAuth(error.response.data.error.message));
      });
  };
}

export function registration(username, userpass, useremail) {
  const userSignUp = {
    username,
    userpass,
    useremail,
  };
  return (dispatch) => {
    return api.post(`${localhost}/users/registration`, userSignUp)
      .then(help.checkStatus)
      .then((response) => {
        const data = response.data.message;
        return dispatch(addUserMessageAuth(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
