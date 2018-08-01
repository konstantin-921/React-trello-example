const initial = {
  redirectLogin: false,
  userMessageAuth: '',
};

const reducerAuth = (state = initial, action) => {
  const { data } = action;
  switch (action.type) {
    case 'REDIRECT_LOGIN':
      return {
        ...state,
        redirectLogin: data,
      };
    case 'ADD_USER_MESSAGE_AUTH':
      return {
        ...state,
        userMessage: data,
      };
    case 'HIDE_USER_MESSAGE':
      return {
        ...state,
        userMessage: '',
      };
    default:
      return state;
  }
};

export default reducerAuth;
