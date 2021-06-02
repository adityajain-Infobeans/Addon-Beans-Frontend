<template>
  <div>
    <v-card width="600" class="mx-auto mt-12">
      <v-card-title>
        <h1 class="display-1">Login</h1>
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field
            name="email"
            label="Email"
            id="Email"
            prepend-icon="mdi-account-circle"
            type="email"
            v-model="email"
          ></v-text-field>
          <v-text-field
            name="Password"
            label="Password"
            id="Password"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            v-model="password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <!-- <v-btn color="success">Registration </v-btn> -->
        <v-spacer></v-spacer>
        <v-btn color="info" @click="login">Login </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  data: () => ({
    showPassword: false,
    email: null,
    password: null,
  }),

  mounted() {
    document.title = 'Login';
  },

  methods: {
    login() {
      if (this.email && this.password) {
        axios
          .post('https://infobeans-support.herokuapp.com/employee', {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      return true;
    },
  },
};
</script>
