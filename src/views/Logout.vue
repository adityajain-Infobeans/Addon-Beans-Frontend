<template>
  <div>{{ redirect() }}</div>
</template>
<script>
export default {
  methods: {
    redirect() {
      localStorage.clear();
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>
