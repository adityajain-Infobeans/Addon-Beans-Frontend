/* eslint-disable vue/no-unused-components */
<template>
  <div></div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['token']),
  },
  mounted() {
    if (!token) {
      this.$router.push({ name: 'Login' });
    }
    this.$router.push({ name: 'Dashboard' });
  },
};
</script>
