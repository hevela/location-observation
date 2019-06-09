<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex xs12>
        <MglMap :accessToken="mapBoxToken" :mapStyle.sync="mapStyle">
          <MglMarker
            v-for="marker in markerLocations"
            :key="`${marker.id}-${marker.status}`"
            :coordinates="marker.coordinates"
            :color=marker.color>
            <MglPopup>
              <div>
                <span class="popup">{{ marker.name }} - {{ marker.status }}</span>
              </div>
            </MglPopup>
          </MglMarker>
        </MglMap>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Mapbox from 'mapbox-gl';
import { MglMap, MglMarker, MglPopup } from 'vue-mapbox';
import {
  UPDATE_LOCATION_SUCCESS,
  CREATE_LOCATION_SUCCESS,
  DELETE_LOCATION_SUCCESS,
} from '../store/mutation_names';


export default {
  components: {
    MglMap,
    MglMarker,
    MglPopup,
  },
  data() {
    const mapBoxToken = process.env.VUE_APP_MAPBOX_TOKEN;
    const mapStyle = 'mapbox://styles/mapbox/streets-v11';
    return {
      isConnected: false,
      socketMessage: '',
      mapBoxToken,
      mapStyle,
    };
  },
  computed: {
    ...mapGetters('locations', {
      markerLocations: 'markerLocations',
    }),
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    },

    // Fired when the server sends something on the "message" channel.
    message(data) {
      console.log('data.event ->', data.event);
      switch (data.event) {
        case 'UPDATED':
          this.updateLocationList(data.location);
          break;
        case 'CREATED':
          this.addLocationToList(data.location);
          break;
        case 'DELETED':
          this.removeLocation(data.locationId);
          break;
        default:
          console.error('unhandled case for', data.event);
          break;
      }
    },
  },
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
    this.fetchAllLocations();
  },
  methods: {
    ...mapActions('locations', {
      fetchAllLocations: 'fetchAllLocations',
    }),

    ...mapMutations('locations', {
      updateLocationList: UPDATE_LOCATION_SUCCESS,
      addLocationToList: CREATE_LOCATION_SUCCESS,
      removeLocation: DELETE_LOCATION_SUCCESS,
    }),
  },
};
</script>
<style>
  .popup{
    color: #000;
  }
</style>
