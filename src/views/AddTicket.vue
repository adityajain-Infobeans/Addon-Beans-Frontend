<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" class="mx-auto">
        <TicketForm type="add"> </TicketForm>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'AddTicket',
  components: {
    TicketForm: () => import('@/components/Forms/Ticketform.vue'),
  },
  mounted() {
    if (!localStorage.getItem('token')) {
      this.$router.push({ name: 'Login' });
    }
    document.title = 'Add Ticket';
  },
};
</script>
