<template>
  <div></div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapGetters({ token: 'Auth/token' }),
  },
  mounted() {
    // console.log(this.token, ' this is token');
    if (!this.token) {
      this.$router.push({ name: 'Login' });
    }
    this.$router.push({ name: 'Dashboard' });
  },
};
</script>
