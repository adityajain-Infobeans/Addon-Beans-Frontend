<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" lg="6" xl="5" class="mx-auto">
        <v-card class="mx-auto mt-12">
          <v-card-title>
            <h1 class="display-1">Change Your Password</h1>
          </v-card-title>

          <v-card-text>
            <v-form v-model="formValidated" ref="form">
              <v-text-field
                name="Password"
                label="Password"
                id="Password"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                v-model="newPassword"
                :rules="passwordRules"
                @keyup.enter="changePassword"
                data-testid="newPassword"
              ></v-text-field>

              <v-text-field
                name="ConfirmPassword"
                label="Confirm Password"
                id="ConfirmPassword"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                v-model="ConfirmNewPassword"
                :rules="passwordRules"
                @keyup.enter="changePassword"
                data-testid="ConfirmPassword"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="info"
              @click="changePassword"
              :disabled="!formValidated"
              data-testid="changePasswordBtn"
              >Change Password
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ApiEndpoint } from '@/services/axios/';

export default {
  data: () => ({
    showPassword: false,
    newPassword: null,
    ConfirmNewPassword: null,
    formValidated: false,

    passwordRules: [(v) => !!v || 'Password is required'],
  }),

  methods: {
    validatePassword(userPass) {
      const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      return re.test(userPass);
    },
    changePassword() {
      if (this.newPassword !== this.ConfirmNewPassword) {
        this.$swal({
          icon: 'error',
          title: 'Password Mismatch',
          text: 'Your password & confirm password dosent match',
        });
        return true;
      }
      if (!this.validatePassword(this.newPassword)) {
        this.$swal({
          icon: 'error',
          title: 'Weak Password',
          text:
            'Password must contain at least an upper case letter, a lower case letter, an special character, a number & must be of at least 8 character',
        });
        return true;
      }

      const apiData = {
        newPassword: this.newPassword,
      };
      ApiEndpoint.changePassword(apiData)
        .then((response) => {
          if (response.status !== 200) {
            return new Error(response);
          }

          this.$swal({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
          });
          this.$refs.form.reset();

          return true;
        })
        .catch((error) => {
          console.log(error);
          this.$swal({
            icon: 'error',
            title: 'Some Error Occured',
            text: error.response.data.message,
          });
        });

      return true;
    },
  },
};
</script>
