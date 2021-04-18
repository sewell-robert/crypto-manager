<template>
  <div>
    <p>{{ this.isAuthenticated }}</p>
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

        <v-col
            cols="12"
            md="4"
        >
            <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            ></v-text-field>
        </v-col>
        </v-row>
        <v-btn
          color="primary"
          class="mr-4"
          type="button"
          :disabled="!valid"
          v-on:click="loginUser()"
        >
          Login
        </v-btn>
        <v-btn
          class="mr-4"
          type="submit"
        >
          Sign Up
        </v-btn>
    </v-container>
    </v-form>
  </div>
</template>

<script>
import UserService from '@/api-services/User.Service'

export default {
  name: 'UserLogin',
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
            this.$router.push('AddInvestment');
          }
        })
    }
  },
  data: () => ({
    valid: false,
    isAuthenticated: false,
    username: '',
    password: '',
    nameRules: [
      v => !!v || 'Field is required',
      v => v.length <= 10 || 'Must be less than 20 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  })
}
</script>

<style>

</style>