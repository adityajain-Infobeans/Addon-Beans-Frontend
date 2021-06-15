<template >
  <v-container class="mt-5" v-if="commentsData.length === 0 ? false : true">
    <v-card light class="pa-5">
      <div
        class="blue lighten-4 black--text pa-5 mb-5"
        v-for="commentData in commentsData"
        :key="commentData.id"
      >
        <p class="">
          {{ commentData.comment }}
        </p>
        <p class="text-right">- By {{ commentData.comment_by }}</p>
      </div>
    </v-card>
  </v-container>
</template>

<script>
const axios = require('axios');

export default {
  data: () => ({}),
  created() {
    // get comment data

    const ticketId = this.$route.params.id;
    axios
      .get(`/comment/T_${ticketId}`, {
        headers: {
          Authorization: `Bearer ${this.$store.state.Auth.userData.token}`,
        },
      })
      .then((response) => {
        this.$store.state.Comment.currentComments = response.data.data;
      })
      .catch((error) => {
        this.$swal({
          icon: 'error',
          title: 'Some Error Occured',
          text: error.data.message,
        });
      });
  },
  computed: {
    commentsData() {
      return this.$store.state.Comment.currentComments;
    },
  },
  beforeDestroy() {
    this.$store.dispatch('clearComment');
  },
};
</script>

<style>
</style>
