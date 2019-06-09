import axios from 'axios';

const apiURL = process.env.VUE_APP_API_ADDRESS;

export default {
  getAllLocations() {
    return axios.get(
      `${apiURL}/locations/`,
    );
  },
  deleteLocation(locationId) {
    const token = sessionStorage.getItem('token');
    return axios.delete(
      `${apiURL}/locations/${locationId}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
  updateLocation(locationId, locationObject) {
    const token = sessionStorage.getItem('token');
    return axios.put(
      `${apiURL}/locations/${locationId}/`,
      { ...locationObject },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
  createLocation(locationObject) {
    const token = sessionStorage.getItem('token');
    return axios.post(
      `${apiURL}/locations/`,
      { ...locationObject },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
};
