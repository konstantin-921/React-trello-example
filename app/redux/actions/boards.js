import config from '../../../config/index';
import api from '../../services/api';


export const receiveBoard = (data) => {
  return {
    type: 'RECEIVE_BOARD',
    data,
  };
};

export const setCurrentBoard = (data) => {
  return {
    type: 'SET_CURRENT_BOARD',
    data,
  };
};

export const clearCurrentBoard = () => {
  return {
    type: 'CLEAR_CURRENT_BOARD',
  };
};

export function getBoard() {
  const userData = {
    id: localStorage['user.id'],
  };
  const url = new URL(`${config.path.BASE_URL}boards`);
  url.search = new URLSearchParams(userData);
  return (dispatch) => {
    return api.get(url)
      .then((response) => {
        return dispatch(receiveBoard(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
