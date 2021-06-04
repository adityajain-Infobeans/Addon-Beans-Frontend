/* eslint-disable vue/no-unused-components */
<template>
  <div>
    <div v-if="isLogin()"><Dashboard /></div>
    <div v-else><Login /></div>
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from '@/views/Dashboard.vue';
import Login from '@/views/Login.vue';

export default {
  name: 'Home',
  components: {
    Dashboard,
    Login,
  },
  methods: {
    isLogin() {
      if (!localStorage.getItem('token')) {
        return false;
      }
      return true;
    },
  },
};
</script>
