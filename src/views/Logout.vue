<template>
  <div>{{ redirect() }}</div>
</template>
<script>
export default {
  methods: {
    redirect() {
      this.$store.dispatch('userLogout').then(() => {
        this.$router.push({ name: 'Login' });
      });
    },
  },
};
</script>
