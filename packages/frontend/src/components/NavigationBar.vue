<template>
  <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
  >
    <v-list dense>
      <v-list-tile to="/">
        <v-list-tile-action>
          <v-icon>map</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Map</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to="/signin" v-if="!loggedIn">
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Sign In</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to="/admin" v-else>
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Manage Locations</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="signOut" v-if="loggedIn">
        <v-list-tile-action>
          <v-icon>close</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Sign Out</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import { SIGN_OUT } from '../store/mutation_names';

export default {
  name: 'navigation-bar',
  props: {
    drawer: {},
  },
  computed: {
    ...mapGetters('admin', {
      loggedIn: 'loggedIn',
    }),
  },
  watch: {
    loggedIn(newValue) {
      if (newValue === false) {
        this.$router.push('/');
      }
    },
  },
  methods: {
    ...mapMutations('admin', {
      signOut: SIGN_OUT,
    }),
  },
};
</script>
