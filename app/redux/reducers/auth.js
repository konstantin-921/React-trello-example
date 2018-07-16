const initial = {
  login: '',
  password: '',
  redirectLogin: false,
  userMessageLogin: '',
  userMessageRegistration: '',
};

const reducerAuth = (state = initial, action) => {
  const { data } = action;
  switch (action.type) {
    case 'REDIRECT_LOGIN':
      return {
        ...state,
        redirectLogin: data,
      };
    case 'ADD_USER_MESSAGE_LOGIN':
      return {
        ...state,
        userMessageLogin: data,
      };
    case 'ADD_USER_MESSAGE_REGISTRATION':
      return {
        ...state,
        userMessageRegistration: data,
      };
    default:
      return state;
  }
};

export default reducerAuth;
