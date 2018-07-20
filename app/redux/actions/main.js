import api from '../../services/api';

const localhost = 'http://localhost:3000';

export const receiveBoard = (data) => {
  return {
    type: 'RECEIVE_BOARD',
    data,
  };
};

export const addDefaultTask = (data) => {
  return {
    type: 'ADD_DEFAULT_TASK',
    data,
  };
};

export const setCurrentBoard = (data) => {
  return {
    type: 'SET_CURRENT_BOARD',
    data,
  };
};

export const removeDefaultTask = (data) => {
  return {
    type: 'REMOVE_DEFAULT_TASK',
    data,
  };
};

export const receiveTasks = (data) => {
  return {
    type: 'RECEIVE_TASKS',
    data,
  };
};

export const clearTasks = () => {
  return {
    type: 'CLEAR_TASKS',
  };
};

export const clearCurrentBoard = () => {
  return {
    type: 'CLEAR_CURRENT_BOARD',
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
        return dispatch(receiveTasks(response.data));
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
