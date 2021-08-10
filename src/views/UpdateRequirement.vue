<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" class="mx-auto">
        <RequirementForm type="update"> </RequirementForm>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';

export default {
  name: 'AddRequirement',
  components: {
    RequirementForm: () => import('@/components/Forms/RequirementForm.vue'),
  },
  computed: {
    ...mapGetters(['Auth/token']),
  },
  mounted() {
    if (!Auth/token) {
      this.$router.push({ name: 'Login' });
    }
    document.title = 'Update Requirement';
  },
};
</script>
