<template>
  <v-container
    class="mt-5"
    v-if="currentComments.length === 0 ? false : true"
    data-testid="commentsContainer"
  >
    <v-card light class="pa-5">
      <div
        class="blue lighten-4 black--text pa-5 mb-5"
        v-for="commentData in currentComments"
        :key="commentData.id"
      >
        <p class="" data-testid="commentsDataBox">
          {{ commentData.comment }}
        </p>
        <p class="text-right">- By {{ commentData.comment_by }}</p>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

const { ApiEndpoint } = require('@/services/axios/');

export default {
  data: () => ({}),
  created() {
    // get comment data

    const RequirementId = this.$route.params.id;

    ApiEndpoint.getComment(RequirementId)
      .then((response) => {
        if (response.status !== 200) {
          return new Error(response);
        }
        this.$store.dispatch('Comment/setComment', response.data.data);
        return true;
      })
      .catch((error) => {
        this.$swal({
          icon: 'error',
          title: 'Some Error Occured',
          text: error.response.data.message,
        });
      });
  },
  computed: {
    ...mapGetters({ currentComments: 'Comment/currentComments' }),
  },
  beforeDestroy() {
    this.$store.dispatch('Comment/clearComment');
  },
};
</script>

<style></style>
