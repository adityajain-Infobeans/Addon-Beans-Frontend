<template>
  <div class="white--text">
    <v-container>
      <div v-if="this.$route.params.id">
        <v-row>
          <v-col cols="11" class="mx-auto">
            <RequirementForm />
          </v-col>
        </v-row>
        <AddRequirementComments />
        <RequirementComments />
      </div>
      <div v-else>
        <RequirementsTable />
      </div>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
// params me Requirement id h toh uski details dika do varna pura table
import { mapGetters } from 'vuex';

export default {
  name: 'ViewRequirements',
  components: {
    RequirementsTable: () =>
      // eslint-disable-next-line implicit-arrow-linebreak
      import('@/components/Table/RequirementsTable.vue'),
    RequirementForm: () => import('@/components/Forms/RequirementForm.vue'),
    AddRequirementComments: () =>
      // eslint-disable-next-line implicit-arrow-linebreak
      import('@/components/Forms/AddRequirementComments.vue'),
    RequirementComments: () =>
      // eslint-disable-next-line implicit-arrow-linebreak
      import('@/components/Forms/RequirementComments.vue'),
  },
  computed: {
    ...mapGetters({ token: 'Auth/token' }),
  },
  mounted() {
    if (!token) {
      this.$router.push({ name: 'Login' });
    }
    document.title = 'View Requirement';
  },
};
</script>
