<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <center><h3>Login</h3></center>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="username"
              :rules="nameRules"
              :counter="20"
              label="Username"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="password"
              :rules="nameRules"
              :counter="20"
              label="Password"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn
          color="primary"
          class="mr-4 mt-3"
          type="button"
          :disabled="!valid"
          v-on:click="loginUser()"
        >
          Login
        </v-btn>

        <v-btn
          class="mr-4 mt-3"
          type="button"
          v-on:click="routeToSignUp()"
        >
          Sign Up
        </v-btn>

        <br />

        <p v-if="!isAuthenticated" class="invalidUsernamePassword">{{ this.invalidUsernamePassword }}</p>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import UserService from '@/api-services/User.Service'

export default {
  name: 'UserLogin',
  created () {
    if (localStorage.getItem('username')) {
      this.$router.push('AddInvestment');
    }
  },
  methods: {
    loginUser () {
        const formData = new FormData()
        formData.append('username', this.username)
        formData.append('password', this.password)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        UserService.loginUser(formData, config).then(response => {
          this.isAuthenticated = response.data.isUserAuthenticated;
          console.log(this.isAuthenticated);

          if (this.isAuthenticated == true)
          {
            localStorage.setItem('username', this.username)
            this.$router.push('AddInvestment');
          }
          else
          {
            this.invalidUsernamePassword = "Invalid username or password."
          }
        })
    },
    routeToSignUp () {
      this.$router.push('SignUp');
    }
  },
  data: () => ({
    valid: false,
    isAuthenticated: false,
    invalidUsernamePassword: '',
    username: '',
    password: '',
    nameRules: [
      v => !!v || 'Field is required',
      v => v.length <= 10 || 'Must be less than 20 characters',
    ]
  })
}
</script>

<style scoped>
  .invalidUsernamePassword {
    color: red;
  }
</style>