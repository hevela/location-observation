<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12>
        <v-alert
          v-model="formSuccess"
          dismissible
          type="success"
          color="#00818a"
        >
          {{ successMessage }}
        </v-alert>
        <v-alert
          v-model="formError"
          dismissible
          type="error"
          color="#ff487e"
        >
          {{ errorMessage }}
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="name"
            :rules="notEmptyRules"
            label="Name"
            required
          ></v-text-field>

          <v-select
            v-model="open"
            :items="openStatus"
            :rules="[v => typeof v === 'boolean']"
            label="Status"
            required
          ></v-select>

          <v-text-field
            v-model="latitude"
            :rules="[v => !isNaN(parseFloat(v)) || 'Only numbers allowed']"
            label="Latitude"
            required
          ></v-text-field>
          <v-text-field
            v-model="longitude"
            :rules="[v => !isNaN(parseFloat(v)) || 'Only numbers allowed']"
            label="Longitude"
            required
          ></v-text-field>
          <v-btn
            v-if="locationId"
            color="warning"
            @click="deleteLoc"
            :loading="deleteLocationInProgress"
          >
            Delete location
          </v-btn>
          <v-btn
            :disabled="!valid"
            color="#00818a"
            @click="validate"
            :loading="updateLocationInProgress || createLocationInProgress"
          >
            <template v-if="locationId">Update</template>
            <template v-else>Create</template>
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'LocationForm',
  props: {
    location: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      valid: true,
      notEmptyRules: [
        v => !!v || 'This field is required',
      ],
      openStatus: [
        { value: 0, text: 'Closed' },
        { value: 1, text: 'Open' },
      ],
      open: undefined,
      name: '',
      latitude: '',
      longitude: '',
      locationId: undefined,
      errorMessage: '',
      successMessage: '',
      formError: false,
      formSuccess: false,
    };
  },
  computed: {
    ...mapState('locations', {
      createLocationSuccess: state => state.createLocationSuccess,
      createLocationFailure: state => state.createLocationFailure,
      createLocationInProgress: state => state.createLocationInProgress,
      createLocationError: state => state.createLocationError,

      updateLocationSuccess: state => state.updateLocationSuccess,
      updateLocationFailure: state => state.updateLocationFailure,
      updateLocationInProgress: state => state.updateLocationInProgress,
      updateLocationError: state => state.updateLocationError,

      deleteLocationSuccess: state => state.deleteLocationSuccess,
      deleteLocationFailure: state => state.deleteLocationFailure,
      deleteLocationInProgress: state => state.deleteLocationInProgress,
      deleteLocationError: state => state.deleteLocationError,
    }),
    locationObject() {
      return {
        open: this.open,
        name: this.name.trim(),
        latitude: this.latitude,
        longitude: this.longitude,
        locationId: this.locationId,
      };
    },
  },
  watch: {
    createLocationSuccess(successIsTrue) {
      if (successIsTrue) {
        this.setSuccess('Location created correctly');
      }
    },
    createLocationFailure(failureIsTrue) {
      if (failureIsTrue) {
        this.setError(this.createLocationError);
      }
    },
    updateLocationSuccess(successIsTrue) {
      if (successIsTrue) {
        this.setSuccess('Location updated correctly');
      }
    },
    updateLocationFailure(failureIsTrue) {
      if (failureIsTrue) {
        this.setError(this.updateLocationError);
      }
    },
    deleteLocationSuccess(successIsTrue) {
      if (successIsTrue) {
        this.setSuccess('Location deleted correctly');
      }
    },
    deleteLocationFailure(failureIsTrue) {
      if (failureIsTrue) {
        this.setError(this.deleteLocationError);
      }
    },
    location(newLocation) {
      if (!newLocation.id) {
        this.resetForm();
      } else {
        this.open = this.location.open;
        this.name = this.location.name;
        this.latitude = this.location.latitude;
        this.longitude = this.location.longitude;
        this.locationId = this.location.id;
      }
    },
  },
  methods: {
    ...mapActions('locations', {
      createLocation: 'createLocation',
      updateLocation: 'updateLocation',
      deleteLocation: 'deleteLocation',
    }),
    resetForm() {
      this.open = 1;
      this.name = '';
      this.latitude = '';
      this.longitude = '';
      this.locationId = undefined;
      this.$refs.form.reset();
    },
    validate() {
      if (this.$refs.form.validate()) {
        if (this.locationId) {
          this.updateLocation({
            locationId: this.locationId,
            locationData: this.locationObject,
          });
        } else {
          this.createLocation(this.locationObject);
        }
      }
    },
    deleteLoc() {
      this.deleteLocation(this.locationId);
    },
    setError(errorMessage) {
      this.formSuccess = false;
      this.formError = true;
      this.successMessage = '';
      this.errorMessage = errorMessage;
      this.resetForm();
    },
    setSuccess(successMessage) {
      this.formSuccess = true;
      this.formError = false;
      this.successMessage = successMessage;
      this.errorMessage = '';
      this.resetForm();
    },
  },
};
</script>

<style scoped>

</style>
