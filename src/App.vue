<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <h3>CryptoVue</h3>

      <v-spacer></v-spacer>

      <div v-if="isAuthenticated">
        <v-row>
          <h5 class="welcome-user">Welcome, {{username}}!</h5>
          <v-btn
            icon
            v-on:click="logoutUser()"
          >
            <v-icon>mdi-logout-variant</v-icon>
          </v-btn>
        </v-row>
      </div>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  created () {
    if (localStorage.getItem('username')) {
      this.username = localStorage.getItem('username');
      this.isAuthenticated = true;
    }
    else {
      this.$router.push('/');
    }
  },
  updated () {
    if (localStorage.getItem('username')) {
      this.username = localStorage.getItem('username');
      this.isAuthenticated = true;
    }
    else {
      this.isAuthenticated = false;
    }
  },
  methods: {
    logoutUser() {
      localStorage.clear()
      this.$router.push('/');
    }
  },
  data: () => ({
    username: '',
    isAuthenticated: false
  }),
};
</script>

<style>
  .welcome-user {
    align-self: center;
  }
</style>