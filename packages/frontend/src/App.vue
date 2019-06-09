<template>
  <v-app id="inspire" dark>
    <navigation-bar :drawer="drawer"/>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>Makko - 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';

export default {
  name: 'App',
  components: {
    NavigationBar,
  },
  data() {
    return {
      drawer: true,
    };
  },
};
</script>
