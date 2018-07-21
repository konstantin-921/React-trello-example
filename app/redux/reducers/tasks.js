const initial = {
  boards: [],
  tasks: [],
  defaultTasks: [],
  currentBoard: null,
};

const reducerTasks = (state = initial, action) => {
  const { data } = action;
  switch (action.type) {
    case 'RECEIVE_TASKS':
      return {
        ...state,
        tasks: data,
      };
    case 'ADD_DEFAULT_TASK':
      return {
        ...state,
        defaultTasks: [...state.defaultTasks, data],
      };
    case 'REMOVE_DEFAULT_TASK':
      return {
        ...state,
        defaultTasks: data,
      };
    case 'CLEAR_TASKS':
      return {
        ...state,
        tasks: [],
        defaultTasks: [],
      };
    default:
      return state;
  }
};

export default reducerTasks;
