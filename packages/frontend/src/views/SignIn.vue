<template>
  <v-container grid-list-xl text-xs-center fluid >
    <v-layout justify-center align-center>
      <v-flex xs10>
        <v-form class="xs12 sign-in-form">
          <v-card dark >
            <v-card-title>
              <h1 class="text">Sign In</h1>
            </v-card-title>
            <v-card-text>
              <v-alert
                :value="signInFailure"
                type="error"
              >
                Incorrect username or password
              </v-alert>
              <v-layout row wrap>
                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    v-model="username"
                    :rules="notEmptyRules"
                    label="Username"
                    required
                  ></v-text-field>
                </v-flex>

                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    v-model="password"
                    :append-icon="show ? 'visibility' : 'visibility_off'"
                    :rules="notEmptyRules"
                    :type="show ? 'text' : 'password'"
                    name="password"
                    label="Password"
                    @click:append="show = !show"
                  ></v-text-field>
                </v-flex>
                <v-flex
                  xs12
                  md12
                >
                  <v-btn
                    class="authenticate-button"
                    color="info"
                    @click="authenticate"
                  >
                    Sign In
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'SignIn',
  components: {
  },
  data() {
    return {
      notEmptyRules: [
        v => !!v || 'This field is required',
      ],
      show: false,
      username: '',
      password: '',
    };
  },
  computed: {
    ...mapState('admin', {
      signedIn: state => state.signedIn,
      signInError: state => state.signInError,
      signInFailure: state => state.signInFailure,
    }),
  },
  watch: {
    signedIn(newValue) {
      if (newValue === true) {
        this.$router.push('/admin');
      }
    },
  },
  methods: {
    ...mapActions('admin', {
      signIn: 'signIn',
    }),
    authenticate() {
      this.signIn({ username: this.username, password: this.password });
    },
  },
};
</script>
