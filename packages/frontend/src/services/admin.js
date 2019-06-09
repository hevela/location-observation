import axios from 'axios';

const apiURL = process.env.VUE_APP_API_ADDRESS;

export default {
  authenticate({ username, password }) {
    return axios.post(
      `${apiURL}/auth/signin`,
      { username, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  },
};
