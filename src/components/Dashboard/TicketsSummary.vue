<template>
  <div>
    <v-container class="">
      <v-row class="mt-6 pl-4">
        <h2 class="headline white--text">Ticket Summary:</h2>
      </v-row>
      <v-row class="mt-6 text-center">
        <v-col
          cols="12"
          sm="3"
          class="yellow darken-3 white--text rounded mb-3"
          elevation="4"
        >
          <p class="headline mb-2">Total Tickets</p>
          <p class="display-3 font-weight-bold">{{ totalTickets }}</p>
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          cols="12"
          sm="3"
          class="red darken-1 white--text rounded mb-3"
          elevation="4"
        >
          <p class="headline mb-2">Open Tickets</p>
          <p class="display-3 font-weight-bold">{{ openTickets }}</p>
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          cols="12"
          sm="3"
          class="green darken-1 white--text rounded mb-3"
          elevation="4"
        >
          <p class="headline mb-2">Resolved Tickets</p>
          <p class="display-3 font-weight-bold">{{ resolvedTickets }}</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  data: () => ({
    totalTickets: '--',
    openTickets: '--',
    resolvedTickets: '--',
  }),

  methods: {},
  created() {
    axios
      .get('http://localhost:3000/summary', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log(response);
        this.totalTickets = response.data.data.totalTickets;
        this.openTickets = response.data.data.openTicket;
        this.resolvedTickets = response.data.data.resolvedTicket;
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          this.$router.push({ name: 'Login' });
        }
      });
  },
};
</script>

<style>
</style>
