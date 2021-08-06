<template>
  <v-container
    class="mt-5"
    v-if="commentsData.length === 0 ? false : true"
    data-testid="commentsContainer"
  >
    <v-card light class="pa-5">
      <div
        class="blue lighten-4 black--text pa-5 mb-5"
        v-for="commentData in commentsData"
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
const { getComment } = require('@/services/axios/Forms/RequirementComments');

export default {
  data: () => ({}),
  created() {
    // get comment data

    const RequirementId = this.$route.params.id;

    getComment(this.$store.state.Auth.userData.token, RequirementId)
      .then((response) => {
        this.$store.dispatch('Comment/setComment', response.data.data);
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
    commentsData() {
      return this.$store.state.Comment.currentComments;
    },
  },
  beforeDestroy() {
    this.$store.dispatch('Comment/clearComment');
  },
};
</script>

<style></style>
