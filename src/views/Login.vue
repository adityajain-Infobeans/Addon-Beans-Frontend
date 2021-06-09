<template>
  <LoginForm />
</template>

<script>
// @ is an alias to /src

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
