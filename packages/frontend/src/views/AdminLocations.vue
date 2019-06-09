<template>
  <v-container>
    <v-layout row wrap>
      <v-flex md12 class="text-xs-center">
        <h1>Manage Locations</h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex md4>
        <location-list @locationSelected="selectLocation" :locations="locations" />
      </v-flex>
      <v-flex md8 class="px-3">
        <location-form :location="selectedLocation" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import LocationList from '@/components/LocationList.vue';
import LocationForm from '@/components/LocationForm.vue';

export default {
  name: 'AdminLocations',
  components: {
    LocationList,
    LocationForm,
  },
  data() {
    return {
      selectedLocation: {},
    };
  },
  computed: {
    ...mapState('locations', {
      locations: state => state.locations,
    }),
    ...mapGetters('admin', {
      loggedIn: 'loggedIn',
    }),
  },
  mounted() {
    if (!this.loggedIn) {
      this.$router.push('/');
    } else {
      this.fetchAllLocations();
    }
  },
  methods: {
    ...mapActions('locations', {
      fetchAllLocations: 'fetchAllLocations',
    }),
    selectLocation(location) {
      this.selectedLocation = location;
    },
  },
};
</script>

<style scoped>

</style>
