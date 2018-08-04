import axios from 'axios';

function Api() {
  this.axios = (method, url, data) => {
    return axios({
      method,
      url,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${localStorage.getItem('token.id') || null}`,
      },
    });
  };

  this.get = (url) => {
    return this.axios('get', url);
  };

  this.post = (url, data) => {
    return this.axios('post', url, data);
  };

  this.delete = (url, data) => {
    return this.axios('delete', url, data);
  };

  this.put = (url, data) => {
    return this.axios('put', url, data);
  };
}

const api = new Api();

export default api;
