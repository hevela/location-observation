export const markers = [
  {
    id: 1,
    name: 'location 1',
    coordinates: [90, 90],
    color: '#00818a',
    status: 'Open',
  },
  {
    id: 2,
    name: 'location 2',
    coordinates: [80, 80],
    color: '#404b69',
    status: 'Closed',
  },
  {
    id: 3,
    name: 'location 3',
    coordinates: [45, 45],
    color: '#404b69',
    status: 'Closed',
  },
];
export default {
  namespaced: true,
  state: {
    createLocationSuccess: false,
    createLocationFailure: false,
    createLocationInProgress: false,
    createLocationError: '',
    updateLocationSuccess: false,
    updateLocationFailure: false,
    updateLocationInProgress: false,
    updateLocationError: '',
    deleteLocationSuccess: false,
    deleteLocationFailure: false,
    deleteLocationInProgress: false,
    deleteLocationError: '',
  },
  getters: {
    markerLocations: () => (
      markers
    ),
  },
};
