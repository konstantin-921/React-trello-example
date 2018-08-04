import help from '../../services/helpers/helperLogin';
import config from '../../../config/index';
import api from '../../services/api';

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
  const url = new URL(`${config.path.BASE_URL}auth/login`);
  url.search = new URLSearchParams(userData);
  return (dispatch) => {
    return api.get(url)
      .then(help.checkStatus)
      .then(help.saveToken)
      .then(() => {
        return api.post(`${config.path.BASE_URL}auth/secret`)
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
    return api.post(`${config.path.BASE_URL}auth/registration`, userSignUp)
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
