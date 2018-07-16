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

export const addUserMessageLogin = (data) => {
  return {
    type: 'ADD_USER_MESSAGE_LOGIN',
    data,
  };
};

export const addUserMessageRegistration = (data) => {
  return {
    type: 'ADD_USER_MESSAGE_REGISTRATION',
    data,
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
      .then((response) => {
        if (!response.data.token) {
          return dispatch(addUserMessageLogin(response.message));
        }
        return api.post(`${localhost}/auth/secret`)
          .then(help.checkStatus)
          .then(() => dispatch(redirectLogin(true)))
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
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
    return api.post(`${localhost}/users`, userSignUp)
      .then(help.checkStatus)
      .then((response) => {
        const data = response.data.error || response.data;
        return dispatch(addUserMessageRegistration(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
