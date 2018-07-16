import axios from 'axios';

function Api() {
  this.get = (url) => {
    return axios({
      method: 'get',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${localStorage.getItem('token.id') || null}`,
      },
    });
  };

  this.post = (url, data) => {
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${localStorage.getItem('token.id') || null}`,
      },
      url,
      data: JSON.stringify(data),
    });
  };

  this.delete = (url, data) => {
    return axios({
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${localStorage.getItem('token.id') || null}`,
      },
      url,
      data: JSON.stringify(data),
    });
  };

  this.put = (url) => {
    return axios.put({
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${localStorage.getItem('token.id') || null}`,
      },
      url,
    });
  };
}

const api = new Api();
export default api;
