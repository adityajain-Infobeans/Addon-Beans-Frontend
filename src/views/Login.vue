<template>
  <LoginForm />
</template>

<script>
export default {
  name: 'LoginView',
  components: {
    LoginForm: () => import('@/components/Forms/LoginForm.vue'),
  },
  mounted() {
    document.title = 'Login';
  },
};
</script>
