/* eslint-disable vue/no-unused-components */
<template>
  <div></div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',

  mounted() {
    if (!this.$store.state.userData.token) {
      this.$router.push({ name: 'Login' });
    }
    this.$router.push({ name: 'Dashboard' });
  },
};
</script>
