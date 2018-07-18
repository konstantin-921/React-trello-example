import api from '../../services/api';

const localhost = 'http://localhost:3000';

export const receiveBoard = (data) => {
  return {
    type: 'ADD_BOARD',
    data,
  };
};

export const setCurrentBoard = (data) => {
  return {
    type: 'SET_CURRENT_BOARD',
    data,
  };
};

export const receiveTask = (data) => {
  return {
    type: 'ADD_TASK',
    data,
  };
};

export function getTasks(id) {
  const userData = {
    id,
  };
  const url = new URL(`${localhost}/tasks`);
  url.search = new URLSearchParams(userData);
  return (dispatch) => {
    return api.get(url)
      .then((response) => {
        return dispatch(receiveTask(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getBoard() {
  const userData = {
    id: localStorage['user.id'],
  };
  const url = new URL(`${localhost}/boards`);
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
