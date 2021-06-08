<template>
  <div>
    <v-card width="600" class="mx-auto mt-12">
      <v-card-title>
        <h1 class="display-1">Login</h1>
      </v-card-title>

      <v-card-text>
        <v-alert type="error" v-if="errorMessage">{{ errorMessage }}</v-alert>
        <v-alert type="success" v-else-if="successMessage"
          >Login Success</v-alert
        >
        <v-form v-model="formValidated">
          <v-text-field
            name="email"
            label="Email"
            id="Email"
            prepend-icon="mdi-account-circle"
            type="email"
            v-model="email"
            :rules="emailRules"
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
            :rules="passwordRules"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <!-- <v-btn color="success">Registration </v-btn> -->
        <v-spacer></v-spacer>
        <v-btn color="info" @click="login" :disabled="!formValidated"
          >Login
        </v-btn>
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
    formValidated: false,
    errorMessage: null,
    successMessage: null,

    emailRules: [
      (v) => !!v || 'Email is required',
      (v) => /\S+@\S+\.\S+/.test(v) || 'Invalid email.',
    ],

    passwordRules: [(v) => !!v || 'Password is required'],
  }),

  mounted() {
    document.title = 'Login';
  },

  methods: {
    login() {
      if (this.email && this.password) {
        axios
          .post('/employee', {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            this.successMessage = response.data;
            localStorage.setItem('emp_id', response.data.data.emp_id);
            localStorage.setItem('emp_name', response.data.data.emp_name);
            localStorage.setItem('emp_email', response.data.data.emp_email);
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('is_hr', response.data.data.is_hr);

            setTimeout(() => {
              this.$router.push({ name: 'Dashboard' });
            }, 1000);
          })
          .catch((error) => {
            this.errorMessage = error.response.data.message;
          });
      }
      return true;
    },
  },
};
</script>
