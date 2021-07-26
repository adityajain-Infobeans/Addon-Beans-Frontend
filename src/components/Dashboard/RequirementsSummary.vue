<template>
  <div>
    <v-container class="">
      <v-row class="mt-6 pl-4">
        <h2 class="headline white--text">Requirement Summary:</h2>
      </v-row>
      <v-row class="mt-6 text-center">
        <v-col cols="12" sm="3" class="yellow darken-3 white--text rounded mb-3" elevation="4">
          <p class="headline mb-2">Total Requirements</p>
          <p class="display-3 font-weight-bold" data-testid="totalRequirements">
            {{ totalRequirements }}
          </p>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="3" class="red darken-1 white--text rounded mb-3" elevation="4">
          <p class="headline mb-2">Open Requirements</p>
          <p class="display-3 font-weight-bold" data-testid="openRequirements">
            {{ openRequirements }}
          </p>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="3" class="green darken-1 white--text rounded mb-3" elevation="4">
          <p class="headline mb-2">Fulfilled Requirements</p>
          <p class="display-3 font-weight-bold" data-testid="resolvedRequirements">
            {{ resolvedRequirements }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  data: () => ({
    totalRequirements: 0,
    openRequirements: 0,
    resolvedRequirements: 0,
  }),

  methods: {},
  created() {
    axios
      .get('/summary', {
        headers: {
          Authorization: `Bearer ${this.$store.state.Auth.userData.token}`,
        },
      })
      .then((response) => {
        this.totalRequirements = response.data.data.totalRequirements;
        this.openRequirements = response.data.data.openRequirement;
        this.resolvedRequirements = response.data.data.resolvedRequirement;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.$router.push({ name: 'Login' });
        }
      });
  },
};
</script>

<style></style>
