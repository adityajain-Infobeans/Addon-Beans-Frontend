<template>
  <div class="white--text">
    <v-container>
      <div v-if="this.$route.params.id">
        <v-row>
          <v-col cols="12" sm="8" class="mx-auto">
            <TicketFom />
          </v-col>
        </v-row>
        <AddTicketComments />
        <TicketComments />
      </div>
      <div v-else>
        <TicketsTable />
      </div>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
// params me ticket id h toh uski details dika do varna pura table

export default {
  name: 'ViewTickets',
  components: {
    TicketsTable: () => import('@/components/Dashboard/TicketsTable.vue'),
    TicketFom: () => import('@/components/Forms/Ticketform.vue'),
    AddTicketComments: () => import('@/components/Forms/AddTicketComments.vue'),
    TicketComments: () => import('@/components/Forms/TicketComments.vue'),
  },

  mounted() {
    document.title = 'View Ticket';
  },
};
</script>
