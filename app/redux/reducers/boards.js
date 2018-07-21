const initial = {
  boards: [],
  currentBoard: null,
};

const reducerBoards = (state = initial, action) => {
  const { data } = action;
  switch (action.type) {
    case 'RECEIVE_BOARD':
      return {
        ...state,
        boards: data,
      };
    case 'SET_CURRENT_BOARD':
      return {
        ...state,
        currentBoard: data,
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

export default reducerBoards;
