<template>
  <v-app>
    <v-sheet
      class="sheet-style-props"
    >
      <v-container class="fill-height">
        <v-row
          align="center"
          justify="center"
        >
          <v-btn
            color="primary"
            fab
            dark
            fixed
            bottom
            right
            large
            @click.stop="drawer = !drawer"
          >
            <v-icon dark>mdi-format-list-bulleted-square</v-icon>
          </v-btn>
        </v-row>
      </v-container>

      <v-navigation-drawer
        v-model="drawer"
        temporary
        app
        bottom
        color="white"
      >
        <v-list dense>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon large color>mdi-plus</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title align="start" class="list-item-title"><router-link to="/AddInvestment" class="menu-item-title"><p>Add Investment</p></router-link></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider><br />

          <v-list-item link>
            <v-list-item-icon>
              <v-icon large>mdi-chart-timeline-variant-shimmer</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title align="start" class="list-item-title"><router-link to="/PerformanceSnapshot" class="menu-item-title"><p>View Investments</p></router-link></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>

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
          <h5 class="welcome-user">Welcome, {{username}}</h5>
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
    isAuthenticated: false,
    drawer: false
  }),
};
</script>

<style>
  .welcome-user {
    align-self: center;
  }
  .list-item-title {
    padding-top: 5px;
  }
  .menu-item-title {
    text-decoration: none;
    font-size: medium;
  }
</style>