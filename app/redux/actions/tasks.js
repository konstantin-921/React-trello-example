import api from '../../services/api';

const localhost = 'http://localhost:3000';

export const addDefaultTask = (data) => {
  return {
    type: 'ADD_DEFAULT_TASK',
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

export const reorderTasksTodo = (data) => {
  return {
    type: 'REORDER_TASKS_TODO',
    data,
  };
};

export const reorderTasksDoing = (data) => {
  return {
    type: 'REORDER_TASKS_DOING',
    data,
  };
};

export const reorderTasksDone = (data) => {
  return {
    type: 'REORDER_TASKS_DONE',
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
        return dispatch(receiveTasks(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}