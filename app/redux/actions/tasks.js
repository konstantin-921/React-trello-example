import api from '../../services/api';

const localhost = 'http://localhost:3000';

export const addDefaultTaskTodo = (data) => {
  return {
    type: 'ADD_DEFAULT_TASK_TODO',
    data,
  };
};

export const addDefaultTaskDoing = (data) => {
  return {
    type: 'ADD_DEFAULT_TASK_DOING',
    data,
  };
};

export const addDefaultTaskDone = (data) => {
  return {
    type: 'ADD_DEFAULT_TASK_DONE',
    data,
  };
};

export const reorderDefaultTaskTodo = (data) => {
  return {
    type: 'REORDER_DEFAULT_TASK_TODO',
    data,
  };
};

export const reorderDefaultTaskDoing = (data) => {
  return {
    type: 'REORDER_DEFAULT_TASK_DOING',
    data,
  };
};

export const reorderDefaultTaskDone = (data) => {
  return {
    type: 'REORDER_DEFAULT_TASK_DONE',
    data,
  };
};

export const removeDefaultTaskTodo = (data) => {
  return {
    type: 'REMOVE_DEFAULT_TASK_TODO',
    data,
  };
};

export const removeDefaultTaskDoing = (data) => {
  return {
    type: 'REMOVE_DEFAULT_TASK_DOING',
    data,
  };
};

export const removeDefaultTaskDone = (data) => {
  return {
    type: 'REMOVE_DEFAULT_TASK_DONE',
    data,
  };
};

export const receiveTasks = (data) => {
  return {
    type: 'RECEIVE_TASKS',
    data: data.sort((a, b) => { return a.position - b.position; }),
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

export function getTasks(id, userId) {
  const userData = {
    id,
    userId,
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

