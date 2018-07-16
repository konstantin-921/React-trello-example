class Help {
  checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  saveToken = (response) => {
    localStorage['token.id'] = response.data.token;
    localStorage['user.id'] = response.data.userId;
    return response;
  }
}

const help = new Help();
export default help;
