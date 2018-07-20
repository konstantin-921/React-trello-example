const initial = {
  boards: [],
  tasks: [],
  defaultTasks: [],
  currentBoard: null,
};

const reducerMain = (state = initial, action) => {
  const { data } = action;
  switch (action.type) {
    case 'RECEIVE_BOARD':
      return {
        ...state,
        boards: data,
      };
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
    case 'SET_CURRENT_BOARD':
      return {
        ...state,
        currentBoard: data,
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
    case 'CLEAR_CURRENT_BOARD':
      return {
        ...state,
        currentBoard: null,
      };
    default:
      return state;
  }
};

export default reducerMain;
