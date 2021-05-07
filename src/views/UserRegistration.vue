<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <center><h3>Sign Up</h3></center>
        <p>*</p>
        <p>Please choose a new and unique password. Passwords are stored in clear-text in the database.</p>
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
          v-on:click="registerUser()"
          :loading="isLoading"
        >
          Sign Up
        </v-btn>

        <br />

        <p v-if="!isSuccess" class="errorMessage">{{ this.errorMessage }}</p>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import UserService from '@/api-services/User.Service'

export default {
  name: 'UserRegistration',
  methods: {
    registerUser () {
        this.isLoading = true;

        const formData = new FormData()
        formData.append('username', this.username)
        formData.append('password', this.password)
        formData.append('email', this.email)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        UserService.registerUser(formData, config).then(response => {
        this.isSuccess = response.data.isSuccess;

        if (this.isSuccess == true)
        {
          this.$router.push('/');
        }
        else 
        {
          this.errorMessage = "Registration failed. Please try again later."
        }

        this.isLoading = false;
      })
    }
  },
  data: () => ({
    valid: false,
    isSuccess: true,
    errorMessage: '',
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
    isLoading: false
  })
}
</script>

<style scoped>
  .errorMessage {
    color: red;
  }
</style>