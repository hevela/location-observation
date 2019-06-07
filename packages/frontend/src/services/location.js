import axios from 'axios';

const callBitbucketAPI = () => axios({
  method: 'get',
  url: '',
  headers: {
    Authorization: 'Bearer ',
  },
});

export {
  // eslint-disable-next-line import/prefer-default-export
  callBitbucketAPI,
};
