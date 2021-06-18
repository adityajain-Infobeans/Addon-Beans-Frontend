<template>
  <div class="white--text">
    <v-container>
      <RequirementsSummary />

      <v-divider class="mt-12 mb-5"></v-divider>

      <RequirementsTable />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

// import RequirementsSummary from '';
// import RequirementsTable from '';

export default {
  name: 'Dashboard',
  components: {
    RequirementsSummary: () =>
      // eslint-disable-next-line implicit-arrow-linebreak
      import('@/components/Dashboard/RequirementsSummary.vue'),
    RequirementsTable: () =>
      // eslint-disable-next-line implicit-arrow-linebreak
      import('@/components/Table/RequirementsTable.vue'),
  },

  mounted() {
    if (!this.$store.state.Auth.userData.token) {
      this.$router.push({ name: 'Login' });
    }
    document.title = 'Dashboard';
  },
};
</script>
