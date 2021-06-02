<template>
  <div class="white--text">
    <v-container>
      <TicketsSummary />

      <v-divider class="mt-12 mb-5"></v-divider>

      <TicketsTable />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

// import TicketsSummary from '';
// import TicketsTable from '';

export default {
  name: 'Dashboard',
  components: {
    TicketsSummary: () => import('@/components/Dashboard/TicketsSummary.vue'),
    TicketsTable: () => import('@/components/Dashboard/TicketsTable.vue'),
  },

  mounted() {
    document.title = 'Dashboard';
  },
};
</script>
