<template>
  <v-app>
    <!-- navbar -->
    <Navbar />
    <v-main>
      <router-view />
    </v-main>
    <!-- footer -->
  </v-app>
</template>

<script>
// @ is an alias to /src

import Navbar from '@/components/Navbar/Navbar.vue';

export default {
  name: 'App',
  components: { Navbar },
  methods: {
    checkLogin() {
      if (localStorage.getItem('userData')) {
        const userData = JSON.parse(localStorage.getItem('userData'));
        this.$store.dispatch('Auth/userLogin', userData);
      }
    },
  },
  created() {
    this.checkLogin();
  },
};
</script>
