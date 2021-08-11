<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" lg="6" xl="5" class="mx-auto">
        <v-card class="mx-auto mt-12">
          <v-card-title>
            <h1 class="display-1">Login</h1>
          </v-card-title>

          <v-card-text>
            <v-alert type="error" v-if="errorMessage" data-testid="errorMessage">{{
              errorMessage
            }}</v-alert>
            <v-alert type="success" v-else-if="successMessage" data-testid="successMessage"
              >Login Success</v-alert
            >
            <v-form v-model="formValidated">
              <v-text-field
                name="email"
                label="Email"
                id="Email"
                data-testid="email"
                prepend-icon="mdi-account-circle"
                type="email"
                v-model="email"
                :rules="emailRules"
                @keyup.enter="login"
              ></v-text-field>
              <v-text-field
                name="Password"
                label="Password"
                id="Password"
                data-testid="password"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                v-model="password"
                :rules="passwordRules"
                @keyup.enter="login"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn text @click="forgotPassword" data-testid="forgotButton"
              >Forgot Password ?
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="info" @click="login" :disabled="!formValidated" data-testid="loginButton"
              >Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const { ApiEndpoint } = require('@/services/axios/');

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

  methods: {
    login() {
      if (this.email && this.password) {
        const apiData = { email: this.email, password: this.password };
        ApiEndpoint.loginEmployee(apiData)
          .then((response) => {
            if (response.status !== 200) {
              return new Error(response);
            }

            this.successMessage = response.data;

            const userData = {
              emp_id: response.data.data.emp_id,
              emp_name: response.data.data.emp_name,
              emp_email: response.data.data.emp_email,
              token: response.data.data.token,
              is_hr: response.data.data.is_hr,
            };
            setTimeout(() => {
              this.$store.dispatch('Auth/userLogin', userData);
              this.$router.push({ name: 'Dashboard' });
            }, 1000);
            return true;
          })
          .catch((error) => {
            this.errorMessage = error.response.data.message;
          });
      }
      return true;
    },
    forgotPassword() {
      this.errorMessage = 'Please contact IT team to reset your password.';
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
    },
  },
};
</script>
