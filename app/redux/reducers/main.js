const initial = {
  boards: [],
  tasks: [],
  currentBoard: null,
};

const reducerMain = (state = initial, action) => {
  const { data } = action;
  switch (action.type) {
    case 'ADD_BOARD':
      return {
        ...state,
        boards: data,
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: data,
      };
    case 'SET_CURRENT_BOARD':
      return {
        ...state,
        currentBoard: data,
      };
    default:
      return state;
  }
};

export default reducerMain;
