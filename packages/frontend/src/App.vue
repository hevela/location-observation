<template>
  <v-app id="inspire" dark>
    <navigation-bar :drawer="drawer"/>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <div>
            <p v-if="isConnected">We're connected to the server!</p>
            <p>Message from server: "{{socketMessage}}"</p>
            <button @click="pingServer()">Ping Server</button>
          </div>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2019</span>
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
      isConnected: false,
      socketMessage: '',
    };
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
      this.socketMessage = data;
    },
  },
  methods: {
    pingServer() {
      // Send the "pingServer" event to the server.
      this.$socket.emit('pingServer', 'PING!');
    },
  },
};
</script>
