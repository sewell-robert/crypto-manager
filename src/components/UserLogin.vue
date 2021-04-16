<template>
  <div>
    <v-form v-model="valid"></v-form>
    <v-container>
        <h3>Login</h3>
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
          class="mr-4"
          type="submit"
          :disabled="valid"
        >
          Login
        </v-btn>
    </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  data: () => ({
    valid: false,
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