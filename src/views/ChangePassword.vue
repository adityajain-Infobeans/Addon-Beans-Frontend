<template>
  <ChangePasswordForm />
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';

export default {
  name: 'ChangePassword',
  components: {
    ChangePasswordForm: () => import('@/components/Forms/ChangePasswordForm.vue'),
  },
  computed: {
    ...mapGetters({ token: 'Auth/token' }),
  },
  mounted() {
    if (!this.token) {
      this.$router.push({ name: 'Login' });
    }
    document.title = 'Change Password';
  },
};
</script>
