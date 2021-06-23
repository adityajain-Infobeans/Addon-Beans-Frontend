<template>
  <ChangePasswordForm />
</template>

<script>
// @ is an alias to /src

export default {
  name: 'ChangePassword',
  components: {
    ChangePasswordForm: () =>
      import('@/components/Forms/ChangePasswordForm.vue'),
  },
  mounted() {
    if (!this.$store.state.Auth.userData.token) {
      this.$router.push({ name: 'Login' });
    }
    document.title = 'Change Password';
  },
};
</script>
